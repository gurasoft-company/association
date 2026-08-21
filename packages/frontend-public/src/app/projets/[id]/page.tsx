'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Projet, Besoin, Don, ImageProjet } from '../../../../types';
import api from '../../../../services/api';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';
import { formatDate } from '../../../utils/dateUtils';
import { getImageUrl } from '../../../../config/api';

export default function ProjetDetail() {
  const params = useParams();
  const id = params.id as string;
  const [projet, setProjet] = useState<Projet | null>(null);
  const [besoins, setBesoins] = useState<Besoin[]>([]);
  const [images, setImages] = useState<ImageProjet[]>([]);
  const [dons, setDons] = useState<Don[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const [projetRes, besoinsRes, imagesRes, donsRes] = await Promise.all([
          api.get(`/projets/${id}`),
          api.get(`/besoins/projet/${id}`),
          api.get(`/images/projet/${id}`),
          api.get('/dons')
        ]);
        setProjet(projetRes.data);
        setBesoins(besoinsRes.data);
        setImages(imagesRes.data);
        setDons(donsRes.data.filter((d: Don) => d.idProjet === parseInt(id)));
      } catch (error) {
        console.error('Erreur lors du chargement', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const totalCollected = dons.reduce((sum, d) => sum + (d.montant || 0), 0);
  const target = projet?.objectif || 10000;
  const percentage = Math.min((totalCollected / target) * 100, 100);

  const defaultImages = [
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=500&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1547592180-85f173990554?w=1200&h=500&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=1200&h=500&fit=crop&crop=center',
  ];

  const getCarouselImages = () => {
    if (images.length > 0) {
      // ✅ Utiliser la fonction centralisée getImageUrl
      const imageUrls = images.map(img => getImageUrl(img.url));
      
      if (imageUrls.length < 3) {
        const duplicated = [];
        while (duplicated.length < 3) {
          duplicated.push(...imageUrls);
        }
        return duplicated.slice(0, 3);
      }
      return imageUrls;
    }
    return defaultImages;
  };

  const carouselImages = getCarouselImages();
  const besoinsFiltres = besoins.filter(besoin => besoin.quantite > 0);

  const formatQuantite = (quantite: number, unite: string, description: string) => {
    let uniteAffichee = unite;
    if (unite === 'unité' || unite === 'unites') {
      uniteAffichee = quantite > 1 ? 'unités' : 'unité';
    }
    
    if (description.toLowerCase().includes('tracteur')) {
      return `${quantite} tracteur${quantite > 1 ? 's' : ''}`;
    }
    if (description.toLowerCase().includes('engrais')) {
      return `${quantite} ${uniteAffichee} d'engrais`;
    }
    if (description.toLowerCase().includes('semence') || description.toLowerCase().includes('graine')) {
      return `${quantite} ${uniteAffichee} de semences`;
    }
    
    return `${quantite} ${uniteAffichee}`;
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 mx-auto"></div>
        <p className="text-gray-500 mt-4">Chargement...</p>
      </div>
    );
  }

  if (!projet) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500 text-lg">Projet non trouvé</p>
      </div>
    );
  }

  const statusConfig = {
    en_cours: { color: 'bg-green-100 text-green-700', icon: '🔄', label: 'En cours' },
    termine: { color: 'bg-gray-100 text-gray-700', icon: '✅', label: 'Terminé' },
    en_attente: { color: 'bg-yellow-100 text-yellow-700', icon: '⏳', label: 'En attente' },
  };

  const status = statusConfig[projet.statut as keyof typeof statusConfig] || statusConfig.en_cours;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">

      {/* ===== EN-TÊTE ===== */}
      <div className="mb-6 sm:mb-8">
        <Link href="/projets" className="text-green-600 hover:text-green-700 flex items-center gap-2 text-xs sm:text-sm mb-3 sm:mb-4">
          ← Retour aux projets
        </Link>
        <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between gap-3 sm:gap-4">
          <div className="w-full sm:w-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">{projet.nom}</h1>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-2">
              <span className={`text-xs sm:text-sm font-medium px-3 py-1 rounded-full ${status.color}`}>
                {status.icon} {status.label}
              </span>
            </div>
          </div>
          <Link
            href="/dons"
            className="w-full sm:w-auto inline-block bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 py-3 rounded-lg font-semibold shadow transition transform hover:scale-105 text-center text-sm sm:text-base min-h-[48px]"
          >
            💚 Soutenir ce projet
          </Link>
        </div>
      </div>

      {/* ===== CARROUSEL ===== */}
      <div className="rounded-2xl overflow-hidden shadow-lg mb-6 sm:mb-8">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          autoplay={{ delay: 5000 }}
          loop={carouselImages.length >= 3}
          speed={1000}
          className="h-[200px] sm:h-[300px] md:h-[400px] w-full"
        >
          {carouselImages.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full w-full">
                <Image
                  src={src}
                  alt={`${projet.nom} - image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 100vw"
                  unoptimized={src.includes('localhost') || src.includes('/uploads')}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = defaultImages[0];
                  }}
                />
                <div className="absolute inset-0 bg-black/30"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ===== MONTANT COLLECTÉ ===== */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-1 sm:gap-0">
          <span className="text-xs sm:text-sm font-medium text-gray-600">Montant collecté</span>
          <span className="text-xs sm:text-sm font-semibold text-green-600">
            {totalCollected.toLocaleString()} € / {target.toLocaleString()} €
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4 overflow-hidden">
          <div
            className="h-3 sm:h-4 rounded-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-700"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <p className="text-[10px] sm:text-xs text-gray-400 mt-1 text-right">
          {percentage.toFixed(0)}% atteint
        </p>
      </div>

      {/* ===== INFOS ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-gray-100 text-center">
          <p className="text-[10px] sm:text-sm text-gray-500">Objectif</p>
          <p className="text-base sm:text-xl font-bold text-gray-800">{projet.objectif?.toLocaleString() || 'Non défini'} €</p>
        </div>
        <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-gray-100 text-center">
          <p className="text-[10px] sm:text-sm text-gray-500">Début</p>
          <p className="text-base sm:text-xl font-bold text-gray-800">{formatDate(projet.date_debut)}</p>
        </div>
        <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-gray-100 text-center">
          <p className="text-[10px] sm:text-sm text-gray-500">Fin</p>
          <p className="text-base sm:text-xl font-bold text-gray-800">{formatDate(projet.date_fin)}</p>
        </div>
      </div>

      {/* ===== DESCRIPTION ===== */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3">📖 Description du projet</h2>
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line">
            {projet.description || 'Aucune description disponible pour ce projet.'}
          </p>
        </div>
      </div>

      {/* ===== BESOINS ===== */}
      {besoinsFiltres.length > 0 && (
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-4 gap-2 sm:gap-0">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">📦 Besoins en nature</h2>
            <span className="text-xs sm:text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
              {besoinsFiltres.length} besoin{besoinsFiltres.length > 1 ? 's' : ''}
            </span>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-3 sm:p-4 mb-4">
            <p className="text-xs sm:text-sm text-green-800">
              <strong>💡 À savoir :</strong> Pour mener à bien ce projet, nous avons besoin de votre soutien sous forme de <strong>dons en nature</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {besoinsFiltres.map((besoin) => {
              const quantiteFormatee = formatQuantite(besoin.quantite, besoin.unite, besoin.description);
              const hasValeur = besoin.valeur_estimee !== null && 
                                besoin.valeur_estimee !== undefined && 
                                besoin.valeur_estimee > 0;
              
              return (
                <div 
                  key={besoin.idBesoin} 
                  className="p-4 sm:p-5 rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-md transition-all duration-200 bg-white"
                >
                  <h4 className="font-semibold text-gray-800 text-sm sm:text-base mb-2">
                    {besoin.description}
                  </h4>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <span className="bg-green-50 text-green-700 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium">
                      📦 {quantiteFormatee}
                    </span>
                    {hasValeur && (
                      <span className="bg-gray-100 text-gray-700 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm">
                        💰 {besoin.valeur_estimee.toLocaleString()} €
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 bg-gray-50 border border-gray-200 rounded-xl p-3 sm:p-4 text-center">
            <p className="text-xs sm:text-sm text-gray-700">
              🙏 Chaque don compte ! Ensemble, nous pouvons faire de ce projet une réalité.
            </p>
          </div>
        </div>
      )}

      {/* ===== APPEL À L'ACTION ===== */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl p-6 sm:p-8 text-center shadow-lg">
        <h2 className="text-xl sm:text-2xl font-bold mb-2">Soutenez ce projet</h2>
        <p className="text-white/80 text-sm sm:text-base mb-4 max-w-xl mx-auto px-2">
          Votre don, qu&apos;il soit en espèces ou en nature, contribue directement à la réalisation de ce projet.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          <Link
            href="/dons"
            className="w-full sm:w-auto bg-white text-green-700 hover:bg-gray-100 px-6 sm:px-8 py-3 rounded-full font-semibold shadow transition transform hover:scale-105 text-sm sm:text-base min-h-[48px]"
          >
            💚 Faire un don
          </Link>
          <Link
            href="/benevoles"
            className="w-full sm:w-auto bg-white/20 hover:bg-white/30 text-white px-6 sm:px-8 py-3 rounded-full font-semibold transition text-sm sm:text-base min-h-[48px]"
          >
            🤝 Devenir bénévole
          </Link>
        </div>
      </div>

    </div>
  );
}