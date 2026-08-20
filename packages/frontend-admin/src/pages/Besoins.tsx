import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';
import api from '../services/api';

interface Besoin {
  idBesoin: number;
  description: string;
  quantite: number;
  unite: string;
  valeur_estimee: number;
  idProjet: number;
  Projet?: {
    idProjet: number;
    nom: string;
  };
}

interface Projet {
  idProjet: number;
  nom: string;
}

export default function Besoins() {
  const [besoins, setBesoins] = useState<Besoin[]>([]);
  const [projets, setProjets] = useState<Projet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    quantite: '',
    unite: '',
    valeur_estimee: '',
    idProjet: '',
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [besoinsRes, projetsRes] = await Promise.all([
        api.get('/besoins'),
        api.get('/projets')
      ]);
      
      setBesoins(besoinsRes.data);
      setProjets(projetsRes.data);
    } catch (err) {
      console.error('Erreur chargement données:', err);
      setError('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      if (!formData.description.trim()) {
        setError('La description est requise');
        setIsSubmitting(false);
        return;
      }
      if (!formData.quantite || parseInt(formData.quantite) <= 0) {
        setError('La quantité doit être un nombre positif');
        setIsSubmitting(false);
        return;
      }
      if (!formData.idProjet) {
        setError('Veuillez sélectionner un projet');
        setIsSubmitting(false);
        return;
      }

      const payload = {
        description: formData.description.trim(),
        quantite: parseInt(formData.quantite),
        unite: formData.unite.trim(),
        valeur_estimee: parseFloat(formData.valeur_estimee) || 0,
        idProjet: parseInt(formData.idProjet),
      };

      await api.post(`besoins/projet/${formData.idProjet}`, payload);
      setSuccess('✅ Besoin ajouté avec succès !');
      setShowForm(false);
      setFormData({
        description: '',
        quantite: '',
        unite: '',
        valeur_estimee: '',
        idProjet: '',
      });
      await fetchData();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error('Erreur ajout besoin:', err);
      setError('Erreur lors de l\'ajout du besoin');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Supprimer ce besoin ?')) return;
    try {
      await api.delete(`/besoins/${id}`);
      await fetchData();
    } catch (err) {
      console.error('Erreur suppression besoin:', err);
      setError('Erreur lors de la suppression du besoin');
    }
  };

  return (
    <ProtectedRoute>
      <Layout>
        <div className="p-6">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Gestion des besoins</h1>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              {showForm ? 'Annuler' : '+ Nouveau besoin'}
            </button>
          </div>

          {/* MESSAGES */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              ❌ {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
              {success}
            </div>
          )}

          {/* FORMULAIRE */}
          {showForm && (
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow border border-gray-200 mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Nouveau besoin</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Projet */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Projet <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.idProjet}
                    onChange={(e) => setFormData({ ...formData, idProjet: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Sélectionnez un projet</option>
                    {projets.map((p) => (
                      <option key={p.idProjet} value={p.idProjet}>
                        {p.nom}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Description du besoin"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Quantité */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantité <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Quantité"
                    value={formData.quantite}
                    onChange={(e) => setFormData({ ...formData, quantite: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Unité */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unité</label>
                  <input
                    type="text"
                    placeholder="Unité (ex: pièce, kg)"
                    value={formData.unite}
                    onChange={(e) => setFormData({ ...formData, unite: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Valeur estimée */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Valeur estimée (€)</label>
                  <input
                    type="number"
                    placeholder="Valeur estimée en euros"
                    value={formData.valeur_estimee}
                    onChange={(e) => setFormData({ ...formData, valeur_estimee: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Boutons */}
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition text-gray-700"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Création...' : 'Créer le besoin'}
                </button>
              </div>
            </form>
          )}

          {/* TABLEAU */}
          {loading ? (
            <p className="text-gray-500">Chargement...</p>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              ❌ {error}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left text-gray-700">Description</th>
                    <th className="p-3 text-left text-gray-700">Quantité</th>
                    <th className="p-3 text-left text-gray-700">Unité</th>
                    <th className="p-3 text-left text-gray-700">Valeur estimée</th>
                    <th className="p-3 text-left text-gray-700">Projet</th>
                    <th className="p-3 text-left text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {besoins.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-6 text-center text-gray-500">
                        Aucun besoin. Créez le premier !
                      </td>
                    </tr>
                  ) : (
                    besoins.map((besoin) => (
                      <tr key={besoin.idBesoin} className="border-t">
                        <td className="p-3 text-gray-700">{besoin.description}</td>
                        <td className="p-3 text-gray-700">{besoin.quantite}</td>
                        <td className="p-3 text-gray-700">{besoin.unite || '-'}</td>
                        <td className="p-3 text-gray-700">{besoin.valeur_estimee} €</td>
                        <td className="p-3 text-gray-700">
                          {besoin.Projet?.nom || 'Non affecté'}
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => handleDelete(besoin.idBesoin)}
                            className="text-red-600 hover:text-red-800"
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Layout>
    </ProtectedRoute>
  );
}