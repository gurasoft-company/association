'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative rounded-2xl shadow-2xl overflow-hidden max-w-7xl mx-auto">
      
      {/* Image de fond */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=1400&h=500&fit=crop&crop=center"
          alt="Formation et développement"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-800/90 to-green-600/80"></div>
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto text-center py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        
        {/* Badge */}
        <span className="inline-block bg-yellow-400 text-green-800 text-[10px] sm:text-xs font-bold px-3 sm:px-4 py-0.5 sm:py-1 rounded-full mb-2 sm:mb-3">
          🌟 Communauté Sainte Thérèse de l&apos;Enfant Jésus
        </span>
        
        {/* Titre */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-3 sm:mb-4 text-white">
          Former pour <span className="text-yellow-300">autonomiser</span>
        </h1>
        
        {/* Sous-titre */}
        <p className="text-sm sm:text-base md:text-lg mb-3 sm:mb-4 text-white/95 flex flex-wrap justify-center gap-1.5 sm:gap-2">
          <span>🔧 Formation professionnelle</span>
          <span className="hidden xs:inline">•</span>
          <span>🌾 Agriculture</span>
          <span className="hidden xs:inline">•</span>
          <span>🐄 Élevage</span>
          <span className="hidden xs:inline">•</span>
          <span>💪 Autonomie</span>
        </p>
        
        {/* Description */}
        <p className="text-xs sm:text-sm md:text-base max-w-2xl mx-auto mb-5 sm:mb-6 md:mb-8 text-white/80 px-2">
          Nous formons les jeunes et les femmes aux métiers techniques pour leur offrir une indépendance économique durable.
        </p>
        
        {/* Boutons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          <Link 
            href="/dons" 
            className="w-full sm:w-auto bg-yellow-400 text-green-800 hover:bg-yellow-300 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-semibold shadow-lg hover:shadow-xl transition transform hover:scale-105 text-sm sm:text-base min-h-[48px] flex items-center justify-center"
          >
            💚 Faire un don
          </Link>
          <Link 
            href="#mission" 
            className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-green-700 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-semibold transition transform hover:scale-105 text-sm sm:text-base min-h-[48px] flex items-center justify-center"
          >
            En savoir plus
          </Link>
        </div>
      </div>
    </section>
  );
}