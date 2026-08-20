import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';
import api from '../services/api';

export default function Dashboard() {
  const [stats, setStats] = useState({
    projets: 0,
    dons: 0,
    benevoles: 0,
    donateurs: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/admin/dashboard');
        setStats(response.data);
      } catch (error) {
        console.error('Erreur chargement stats', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    { label: 'Projets', value: stats.projets, color: 'bg-blue-500' },
    { label: 'Dons', value: stats.dons, color: 'bg-green-500' },
    { label: 'Bénévoles', value: stats.benevoles, color: 'bg-orange-500' },
    { label: 'Donateurs', value: stats.donateurs, color: 'bg-purple-500' },
  ];

  return (
    <ProtectedRoute>
      <Layout>
        <h1 className="text-3xl font-bold mb-6">Tableau de bord</h1>
        {loading ? (
          <p>Chargement...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((card, index) => (
              <div
                key={index}
                className={`${card.color} text-white p-6 rounded-lg shadow`}
              >
                <div className="text-2xl font-bold">{card.value}</div>
                <div className="text-sm opacity-80">{card.label}</div>
              </div>
            ))}
          </div>
        )}
      </Layout>
    </ProtectedRoute>
  );
}