import Link from 'next/link';
import { Projet } from '../types';
import Image from 'next/image';

// ✅ Interface étendue localement - sans any
interface ProjetWithImage extends Projet {
  image?: string;
}

interface ProjetsListProps {
  projets: ProjetWithImage[];
}

export default function ProjetsList({ projets }: ProjetsListProps) {
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

  const getStatusLabel = (statut: string) => {
    switch (statut) {
      case 'en_cours':
        return 'En cours';
      case 'termine':
        return 'Terminé';
      case 'en_attente':
        return 'En attente';
      default:
        return statut;
    }
  };

  const getProjectIcon = (nom: string) => {
    const lower = nom.toLowerCase();
    if (lower.includes('agriculture') || lower.includes('agricole') || lower.includes('culture')) return '🌾';
    if (lower.includes('formation') || lower.includes('éducation') || lower.includes('école')) return '📚';
    if (lower.includes('santé') || lower.includes('medical') || lower.includes('hôpital')) return '❤️';
    if (lower.includes('élevage') || lower.includes('bovin') || lower.includes('caprin')) return '🐄';
    if (lower.includes('tracteur') || lower.includes('machine') || lower.includes('équipement')) return '🚜';
    if (lower.includes('serre') || lower.includes('irrigation')) return '🌿';
    if (lower.includes('technique') || lower.includes('mécanique') || lower.includes('soudure')) return '🔧';
    return '🌟';
  };

  // ✅ Type sécurisé - retourne boolean
  const hasImage = (projet: ProjetWithImage): boolean => {
    return typeof projet.image === 'string' && projet.image.length > 0;
  };

  if (projets.length === 0) {
    return (
      <div className="text-center py-12 sm:py-16">
        <div className="text-6xl mb-4">📂</div>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">Aucun projet</h3>
        <p className="text-gray-500 text-sm sm:text-base">Aucun projet n&apos;est disponible pour le moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {projets.map((projet) => {
        const icon = getProjectIcon(projet.nom);
        const imageExists = hasImage(projet);
        
        return (
          <div 
            key={projet.idProjet} 
            className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col hover:border-green-200"
          >
            {/* ===== IMAGE ===== */}
            <div className="relative h-44 sm:h-48 bg-gradient-to-br from-green-100 to-green-50 overflow-hidden flex-shrink-0">
              {/* ✅ Si image existe, on l'affiche */}
              {imageExists && (
                <Image
                  src={projet.image as string} // ✅ TypeScript sait que c'est une string grâce à hasImage()
                  alt={projet.nom}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                />
              )}
              
              {/* ✅ Icône en fond (toujours présente) */}
              <div className="absolute inset-0 flex items-center justify-center text-7xl opacity-30 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
                {icon}
              </div>
              
              {/* Badge de statut */}
              <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10">
                <span className={`text-[10px] sm:text-xs font-semibold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full ${getStatusColor(projet.statut)}`}>
                  {getStatusIcon(projet.statut)} {getStatusLabel(projet.statut)}
                </span>
              </div>
            </div>

            {/* ===== CONTENU ===== */}
            <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-1.5 sm:mb-2 group-hover:text-green-600 transition line-clamp-2">
                {projet.nom}
              </h2>
              
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed flex-grow line-clamp-3">
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
                  className="inline-flex items-center gap-1.5 text-green-600 hover:text-green-700 font-medium text-sm sm:text-base transition group/link"
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
  );
}