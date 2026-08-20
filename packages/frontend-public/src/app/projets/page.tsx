'use client';

import { useEffect, useState } from 'react';
import { Projet, ImageProjet } from '../../../types';
import api from '../../../services/api';
import Link from 'next/link';
import Image from 'next/image';

export default function Projets() {
  const [projets, setProjets] = useState<Projet[]>([]);
  const [imagesProjets, setImagesProjets] = useState<{ [key: number]: ImageProjet[] }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjets = async () => {
      try {
        const response = await api.get('/projets');
        const projetsData = response.data;
        setProjets(projetsData);

        const imagesPromises = projetsData.map((projet: Projet) =>
          api.get(`/images/projet/${projet.idProjet}`)
            .then(res => ({ idProjet: projet.idProjet, images: res.data }))
            .catch(() => ({ idProjet: projet.idProjet, images: [] }))
        );

        const imagesResults = await Promise.all(imagesPromises);
        const imagesMap: { [key: number]: ImageProjet[] } = {};
        imagesResults.forEach(({ idProjet, images }) => {
          imagesMap[idProjet] = images;
        });
        setImagesProjets(imagesMap);

      } catch (error) {
        console.error('Erreur lors du chargement des projets', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjets();
  }, []);

  const getImageUrl = (projetId: number): string => {
    const images = imagesProjets[projetId] || [];
    if (images.length > 0) {
      const url = images[0].url;
      if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
      }
      return `http://localhost:5000${url.startsWith('/') ? '' : '/'}${url}`;
    }
    return 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop&crop=center';
  };

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'en_cours':
        return 'bg-green-100 text-green-700';
      case 'termine':
        return 'bg-gray-100 text-gray-700';
      case 'en_attente':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (statut: string) => {
    switch (statut) {
      case 'en_cours':
        return '🔄';
      case 'termine':
        return '✅';
      case 'en_attente':
        return '⏳';
      default:
        return '📌';
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 mx-auto"></div>
        <p className="text-gray-500 mt-4">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">

      {/* ===== EN-TÊTE ===== */}
      <div className="text-center mb-8 sm:mb-12">
        <span className="text-green-600 font-semibold text-xs sm:text-sm uppercase tracking-wider">Nos actions</span>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-2 text-gray-800">
          Nos projets <span className="text-green-600">en cours</span>
        </h1>
        <div className="h-1 w-16 sm:w-20 bg-green-600 mx-auto mt-3 sm:mt-4"></div>
        <p className="text-gray-600 max-w-2xl mx-auto mt-3 sm:mt-4 text-sm sm:text-base px-4">
          Découvrez les projets que nous menons pour le développement des communautés.
        </p>
      </div>

      {/* ===== CONTENU ===== */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
        </div>
      ) : projets.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">Aucun projet pour le moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {projets.map((projet) => {
            const imageUrl = getImageUrl(projet.idProjet);
            return (
              <div
                key={projet.idProjet}
                className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-green-200 flex flex-col h-full"
              >
                {/* Image */}
                <div className="relative h-48 sm:h-52 md:h-48 bg-gray-100 overflow-hidden flex-shrink-0">
                  <Image
                    src={imageUrl}
                    alt={projet.nom}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    unoptimized={imageUrl.includes('localhost') || imageUrl.includes('/uploads')}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop&crop=center';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                    <span className={`text-[10px] sm:text-xs font-semibold px-2 sm:px-3 py-1 rounded-full ${getStatusColor(projet.statut)}`}>
                      {getStatusIcon(projet.statut)} {projet.statut === 'en_cours' ? 'En cours' : 
                       projet.statut === 'termine' ? 'Terminé' : 'En attente'}
                    </span>
                  </div>
                </div>

                {/* Contenu */}
                <div className="p-4 sm:p-6 flex flex-col flex-grow">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 sm:mb-2 group-hover:text-green-600 transition line-clamp-2">
                    {projet.nom}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-3 flex-grow">
                    {projet.description || 'Description à venir...'}
                  </p>

                  {projet.objectif && (
                    <div className="mt-3 sm:mt-4 flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                      <span className="font-semibold">🎯 Objectif :</span>
                      <span>{projet.objectif.toLocaleString()} €</span>
                    </div>
                  )}

                  <div className="mt-2 flex flex-wrap gap-3 sm:gap-4 text-[10px] sm:text-xs text-gray-500">
                    {projet.date_debut && (
                      <span>📅 Début : {new Date(projet.date_debut).toLocaleDateString('fr-FR')}</span>
                    )}
                    {projet.date_fin && (
                      <span>📅 Fin : {new Date(projet.date_fin).toLocaleDateString('fr-FR')}</span>
                    )}
                  </div>

                  <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-gray-100">
                    <Link
                      href={`/projets/${projet.idProjet}`}
                      className="inline-flex items-center gap-2 text-green-600 font-medium hover:text-green-700 transition group/link text-sm sm:text-base"
                    >
                      Voir le projet
                      <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}