import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';
import api from '../services/api';

interface Benevole {
  idBenevole: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  date_inscription: string;
}

export default function Benevoles() {
  const [benevoles, setBenevoles] = useState<Benevole[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBenevoles = async () => {
    try {
      const response = await api.get('/admin/benevoles');
      setBenevoles(response.data);
    } catch (error) {
      console.error('Erreur chargement bénévoles', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBenevoles();
  }, []);

  const handleValidate = async (id: number) => {
    try {
      await api.put(`/admin/benevoles/${id}/valider`);
      fetchBenevoles();
    } catch (error) {
      console.error('Erreur validation bénévole', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Supprimer ce bénévole ?')) return;
    try {
      await api.delete(`/admin/benevoles/${id}`);
      fetchBenevoles();
    } catch (error) {
      console.error('Erreur suppression bénévole', error);
    }
  };

  return (
    <ProtectedRoute>
      <Layout>
        <h1 className="text-3xl font-bold mb-6">Gestion des bénévoles</h1>

        {loading ? (
          <p>Chargement...</p>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Nom</th>
                  <th className="p-3 text-left">Prénom</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Téléphone</th>
                  <th className="p-3 text-left">Date d'inscription</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {benevoles.map((benevole) => (
                  <tr key={benevole.idBenevole} className="border-t">
                    <td className="p-3">{benevole.nom}</td>
                    <td className="p-3">{benevole.prenom}</td>
                    <td className="p-3">{benevole.email}</td>
                    <td className="p-3">{benevole.telephone}</td>
                    <td className="p-3">{benevole.date_inscription}</td>
                    <td className="p-3">
                      <button
                        onClick={() => handleValidate(benevole.idBenevole)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm mr-2"
                      >
                        Valider
                      </button>
                      <button
                        onClick={() => handleDelete(benevole.idBenevole)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                      >
                        Supprimer
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