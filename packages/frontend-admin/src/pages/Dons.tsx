import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';
import api from '../services/api';

interface Don {
  idDon: number;
  type_don: string;
  montant: number;
  description: string;
  valeur_estimee: number;
  date_don: string;
  Donateur: { nom: string; prenom: string; email: string };
  Projet: { nom: string };
}

export default function Dons() {
  const [dons, setDons] = useState<Don[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDons = async () => {
    try {
      const response = await api.get('/admin/dons');
      setDons(response.data);
    } catch (error) {
      console.error('Erreur chargement dons', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDons();
  }, []);

  const handleValidate = async (id: number) => {
    try {
      await api.put(`/admin/dons/${id}/valider`);
      fetchDons();
    } catch (error) {
      console.error('Erreur validation don', error);
    }
  };

  return (
    <ProtectedRoute>
      <Layout>
        <h1 className="text-3xl font-bold mb-6">Gestion des dons</h1>

        {loading ? (
          <p>Chargement...</p>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Donateur</th>
                  <th className="p-3 text-left">Type</th>
                  <th className="p-3 text-left">Montant / Valeur</th>
                  <th className="p-3 text-left">Projet</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {dons.map((don) => (
                  <tr key={don.idDon} className="border-t">
                    <td className="p-3">
                      {don.Donateur?.prenom} {don.Donateur?.nom}
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded text-sm ${
                        don.type_don === 'especes' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {don.type_don}
                      </span>
                    </td>
                    <td className="p-3">
                      {don.type_don === 'especes' ? `${don.montant} €` : `${don.valeur_estimee} € (estimé)`}
                    </td>
                    <td className="p-3">{don.Projet?.nom || 'Non affecté'}</td>
                    <td className="p-3">{don.date_don}</td>
                    <td className="p-3">
                      <button
                        onClick={() => handleValidate(don.idDon)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                      >
                        Valider
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Layout>
    </ProtectedRoute>
  );
}