"use client";

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';

export default function CarouselHero() {
  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&h=600&fit=crop&crop=center',
      tag: '🌾 Agriculture',
      tagColor: 'bg-green-500/20 border-green-400/30',
      title: 'Cultiver la terre, nourrir l’homme',
      titleMobile: 'Cultiver la terre',
      description: 'Développer une agriculture de subsistance moderne pour lutter contre la faim.'
    },
    {
      image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=1600&h=600&fit=crop&crop=center',
      tag: '🐄 Élevage',
      tagColor: 'bg-orange-500/20 border-orange-400/30',
      title: 'Protéines pour tous',
      titleMobile: 'Protéines pour tous',
      description: 'Développer l’élevage bovin, caprin et piscicole pour assurer les besoins en protéines.'
    },
    {
      image: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=1600&h=600&fit=crop&crop=center',
      tag: '🔧 Formation',
      tagColor: 'bg-blue-500/20 border-blue-400/30',
      title: 'Former pour transformer',
      titleMobile: 'Former pour transformer',
      description: 'Formation professionnelle et technique pour un développement humain intégral et durable.'
    },
    {
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1600&h=600&fit=crop&crop=center',
      tag: '❤️ Santé',
      tagColor: 'bg-red-500/20 border-red-400/30',
      title: 'Santé pour la femme et l’enfant',
      titleMobile: 'Santé pour la femme',
      description: 'Promouvoir le bien-être maternel et infantile pour une communauté en bonne santé.'
    }
  ];

  return (
    <section className="rounded-2xl overflow-hidden shadow-2xl mx-2 sm:mx-0 mb-8 sm:mb-12">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        autoplay={{ delay: 5000 }}
        loop={true}
        speed={1000}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        className="h-[280px] sm:h-[350px] md:h-[450px] lg:h-[500px] w-full"
        fadeEffect={{
          crossFade: true,
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              <Image
                src={slide.image}
                alt={slide.tag}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-center justify-center text-center text-white px-3 sm:px-4 md:px-8">
                <div className="max-w-2xl px-2">
                  <span className={`inline-block text-[10px] sm:text-xs md:text-sm lg:text-base font-semibold ${slide.tagColor} backdrop-blur-sm px-2.5 sm:px-3 md:px-4 py-0.5 sm:py-1 rounded-full mb-2 sm:mb-3 border`}>
                    {slide.tag}
                  </span>
                  
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-1.5 sm:mb-2 md:mb-3 drop-shadow-lg leading-tight">
                    <span className="block sm:hidden">{slide.titleMobile}</span>
                    <span className="hidden sm:block">{slide.title}</span>
                  </h2>
                  
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl max-w-2xl mx-auto opacity-95 drop-shadow-md px-1 sm:px-2 line-clamp-2 sm:line-clamp-3">
                    {slide.description}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ===== STYLES POUR LA PAGINATION ===== */}
      <style jsx>{`
        :global(.swiper-pagination-bullet) {
          background: white !important;
          opacity: 0.5 !important;
          width: 8px !important;
          height: 8px !important;
        }
        :global(.swiper-pagination-bullet-active) {
          background: #facc15 !important;
          opacity: 1 !important;
          width: 24px !important;
          border-radius: 4px !important;
        }
        :global(.swiper-pagination) {
          bottom: 12px !important;
        }
        @media (min-width: 640px) {
          :global(.swiper-pagination-bullet) {
            width: 10px !important;
            height: 10px !important;
          }
          :global(.swiper-pagination-bullet-active) {
            width: 28px !important;
          }
          :global(.swiper-pagination) {
            bottom: 16px !important;
          }
        }
      `}</style>
    </section>
  );
}