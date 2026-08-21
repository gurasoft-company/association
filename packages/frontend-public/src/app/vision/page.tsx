'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';
import { API_BASE_URL } from '../../../public/config/api';

export default function Vision() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">

      {/* ===== EN-TÊTE ===== */}
      <div className="text-center mb-8 sm:mb-12">
        <span className="text-green-600 font-semibold text-xs sm:text-sm uppercase tracking-wider">Qui sommes-nous</span>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-2 text-gray-800">
          Notre <span className="text-green-600">histoire</span>
        </h1>
        <div className="h-1 w-16 sm:w-20 bg-green-600 mx-auto mt-3 sm:mt-4"></div>
        <p className="text-gray-600 max-w-2xl mx-auto mt-3 sm:mt-4 text-sm sm:text-base px-4">
          Découvrez notre parcours, nos accomplissements et notre vision pour l&apos;avenir.
        </p>
      </div>

      {/* ===== CARROUSEL ===== */}
      <div className="rounded-2xl overflow-hidden shadow-lg mb-8 sm:mb-12">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          autoplay={{ delay: 4000 }}
          loop={true}
          speed={1000}
          className="h-[200px] sm:h-[300px] md:h-[400px] w-full"
        >
          {[
            { img: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=1400&h=600&fit=crop&crop=center', tag: '📸 Activités', title: 'Formation des jeunes', loc: 'Diocèse de Lomé' },
            { img: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1400&h=600&fit=crop&crop=center', tag: '📸 Vie spirituelle', title: "25 ans d'engagement", loc: "Diocèse d'Aného" },
            { img: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1400&h=600&fit=crop&crop=center', tag: '📸 Solidarité', title: 'Accompagnement des familles', loc: "Diocèse d'Atakpamé" }
          ].map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full w-full">
                <Image
                  src={slide.img}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 100vw"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-center px-4">
                  <div>
                    <p className="text-[10px] sm:text-sm font-semibold text-green-300">{slide.tag}</p>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mt-1">{slide.title}</h3>
                    <p className="text-xs sm:text-sm opacity-80 mt-1">{slide.loc}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ===== QUI SOMMES-NOUS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center mb-12 sm:mb-16">
        <div className="order-2 md:order-1">
          <span className="text-green-600 font-semibold text-xs sm:text-sm uppercase tracking-wider">Notre identité</span>
          <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-800">
            Une communauté au service <br className="hidden md:block" />du <span className="text-green-600">développement humain</span>
          </h2>
          <div className="h-1 w-16 bg-green-600 mt-3 mb-4"></div>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            La <strong>Communauté Sainte Thérèse de l&apos;Enfant Jésus</strong> est née d&apos;une conviction profonde :
          </p>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed mt-2 italic">
            “On ne peut pas parler d&apos;évangélisation sans parler de pain, de santé, de dignité et d&apos;avenir.”
          </p>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed mt-4">
            <strong>25 ans d&apos;engagement</strong> dans les diocèses de <strong>Lomé</strong>, <strong>Aného</strong> et <strong>Atakpamé</strong>.
            Notre mission spirituelle a toujours été accompagnée d&apos;actions concrètes pour le développement des communautés.
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-4 mt-4 sm:mt-6">
            <span className="bg-green-100 text-green-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm flex items-center gap-1 sm:gap-2">
              <span>📍</span> Lomé
            </span>
            <span className="bg-green-100 text-green-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm flex items-center gap-1 sm:gap-2">
              <span>📍</span> Aného
            </span>
            <span className="bg-green-100 text-green-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm flex items-center gap-1 sm:gap-2">
              <span>📍</span> Atakpamé
            </span>
            <span className="bg-green-100 text-green-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm flex items-center gap-1 sm:gap-2">
              <span>⏳</span> 25 ans
            </span>
          </div>
        </div>
        <div className="relative h-56 sm:h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg order-1 md:order-2">
          <Image
            src="https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800&h=600&fit=crop&crop=center"
            alt="Communauté en action"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      {/* ===== NOS ACCOMPLISSEMENTS ===== */}
      <div className="mb-12 sm:mb-16">
        <div className="text-center mb-6 sm:mb-8">
          <span className="text-green-600 font-semibold text-xs sm:text-sm uppercase tracking-wider">Nos actions</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Ce que nous avons <span className="text-green-600">accompli</span>
          </h2>
          <div className="h-1 w-16 bg-green-600 mx-auto mt-3"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[
            { icon: '🌾', title: '5 hectares cultivés', desc: 'Nous avons acquis 5 hectares de terres agricoles pour développer des cultures modernes et durables.', gradient: 'from-green-100 to-green-50' },
            { icon: '📚', title: 'Écoles primaires', desc: 'Nous avons ouvert des écoles primaires pour offrir une éducation de base aux enfants des communautés.', gradient: 'from-gray-100 to-gray-50' },
            { icon: '🖥️', title: 'Centres de formation', desc: 'Nous avons créé des centres de formation en couture, programmation informatique à Kpalimé.', gradient: 'from-yellow-100 to-yellow-50' }
          ].map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
              <div className={`h-36 sm:h-48 bg-gradient-to-br ${item.gradient} relative`}>
                <div className="absolute inset-0 flex items-center justify-center text-5xl sm:text-7xl opacity-20">{item.icon}</div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 sm:p-4">
                  <p className="text-white font-semibold text-xs sm:text-sm">{item.title}</p>
                </div>
              </div>
              <div className="p-3 sm:p-4">
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== NOS 4 PILIERS ===== */}
      <div className="mb-12 sm:mb-16">
        <div className="text-center mb-6 sm:mb-8">
          <span className="text-green-600 font-semibold text-xs sm:text-sm uppercase tracking-wider">Notre vision</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Nos <span className="text-green-600">4 piliers</span> pour l&apos;avenir
          </h2>
          <div className="h-1 w-16 bg-green-600 mx-auto mt-3"></div>
          <p className="text-gray-600 max-w-2xl mx-auto mt-2 text-sm sm:text-base px-4">
            Nous construisons un avenir durable autour de 4 axes essentiels.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            { icon: '🌾', title: 'Agriculture durable', desc: 'Moderniser les pratiques agricoles avec des serres, des tracteurs et des formations.' },
            { icon: '🐄', title: 'Élevage durable', desc: "Développer l'élevage pour assurer la sécurité alimentaire et les revenus." },
            { icon: '🔧', title: 'Formation professionnelle', desc: "Former aux métiers techniques pour l'autonomie des jeunes et des femmes." },
            { icon: '❤️', title: 'Santé maternelle et infantile', desc: 'Promouvoir le bien-être des femmes et des enfants pour des communautés en bonne santé.' }
          ].map((pillar, index) => (
            <div key={index} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition border border-gray-100">
              <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">{pillar.icon}</div>
              <h3 className="text-lg sm:text-xl font-bold text-green-700 mb-1 sm:mb-2">{pillar.title}</h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ===== NOTRE ENGAGEMENT ===== */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl p-6 sm:p-8 mb-8 sm:mb-12 shadow-lg">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-3 sm:mb-4">Notre engagement</h2>
        <p className="text-center text-white/90 max-w-3xl mx-auto text-sm sm:text-base px-2">
          Nous voulons des communautés autonomes, fières, capables de subvenir à leurs besoins et de transmettre à leurs enfants un avenir meilleur.
        </p>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-4 sm:mt-6">
          <span className="bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm">📍 Lomé</span>
          <span className="bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm">📍 Aného</span>
          <span className="bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm">📍 Atakpamé</span>
          <span className="bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm">⏳ 25 ans d&apos;engagement</span>
        </div>
      </div>

      {/* ===== APPEL À L'ACTION ===== */}
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
          Rejoignez notre <span className="text-green-600">mission</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-4 sm:mb-6 text-sm sm:text-base px-4">
          Ensemble, construisons un avenir durable pour les communautés.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          <Link
            href="/dons"
            className="w-full sm:w-auto inline-block bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-3 rounded-full font-semibold shadow transition transform hover:scale-105 text-sm sm:text-base min-h-[48px] flex items-center justify-center"
          >
            💚 Faire un don
          </Link>
          <Link
            href="/benevoles"
            className="w-full sm:w-auto inline-block bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 sm:px-8 py-3 rounded-full font-semibold transition transform hover:scale-105 text-sm sm:text-base min-h-[48px] flex items-center justify-center"
          >
            🤝 Devenir bénévole
          </Link>
        </div>
      </div>

    </div>
  );
}