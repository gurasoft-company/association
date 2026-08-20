import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-8 sm:mt-12">
      
      {/* ===== HAUT DU FOOTER ===== */}
      <div className="bg-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            
            {/* ===== COLONNE 1 - Association ===== */}
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">
                Communauté <span className="text-yellow-300">Sainte Thérèse</span>
              </h3>
              <p className="text-sm text-white/80 leading-relaxed">
                Organe de développement au service de la personne humaine.
              </p>
              
              <div className="mt-4 flex flex-wrap gap-1.5 sm:gap-2">
                <span className="text-[10px] sm:text-xs bg-white/20 text-white px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full">🌾 Agriculture</span>
                <span className="text-[10px] sm:text-xs bg-white/20 text-white px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full">🐄 Élevage</span>
                <span className="text-[10px] sm:text-xs bg-white/20 text-white px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full">🔧 Formation</span>
                <span className="text-[10px] sm:text-xs bg-white/20 text-white px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full">❤️ Santé</span>
              </div>
            </div>

            {/* ===== COLONNE 2 - Liens rapides ===== */}
            {/* Séparateur horizontal sur mobile */}
            <div className="sm:border-l sm:border-white/20 sm:pl-6 lg:pl-0">
              <h4 className="text-sm sm:text-base font-semibold text-white mb-3 sm:mb-4 pt-2 sm:pt-0 border-t border-white/20 sm:border-t-0">
                Liens rapides
              </h4>
              <ul className="space-y-1.5 sm:space-y-2 text-sm">
                {[
                  { href: '/', label: 'Accueil' },
                  { href: '/projets', label: 'Projets' },
                  { href: '/vision', label: 'Notre vision' },
                  { href: '/dons', label: 'Faire un don' },
                  { href: '/benevoles', label: 'Devenir bénévole' },
                ].map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href} 
                      className="text-white/80 hover:text-white transition text-xs sm:text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ===== COLONNE 3 - Contact ===== */}
            <div className="lg:border-l lg:border-white/20 lg:pl-6">
              <h4 className="text-sm sm:text-base font-semibold text-white mb-3 sm:mb-4 pt-2 sm:pt-0 border-t border-white/20 sm:border-t-0 lg:border-t-0">
                Nous rejoindre
              </h4>
              <ul className="space-y-2 sm:space-y-2.5 text-sm text-white/80">
                <li className="flex items-start gap-2 text-xs sm:text-sm">
                  <span className="flex-shrink-0 mt-0.5">📍</span>
                  <span>Lomé • Aného • Atakpamé</span>
                </li>
                <li className="flex items-start gap-2 text-xs sm:text-sm">
                  <span className="flex-shrink-0 mt-0.5">📧</span>
                  <a 
                    href="mailto:contact@communautesainte-therese.org" 
                    className="hover:text-white transition break-all"
                  >
                    contact@communautesainte-therese.org
                  </a>
                </li>
                <li className="flex items-start gap-2 text-xs sm:text-sm">
                  <span className="flex-shrink-0 mt-0.5">📞</span>
                  <span>+228 90 00 00 00</span>
                </li>
                <li className="flex items-start gap-2 text-xs sm:text-sm">
                  <span className="flex-shrink-0 mt-0.5">⏳</span>
                  <span>25 ans d&apos;engagement</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ===== BAS DU FOOTER ===== */}
      <div className="relative bg-gray-200/90 backdrop-blur-sm border-t border-gray-300 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-black/10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 relative z-10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-1 sm:gap-0 text-center sm:text-left">
            <p className="text-green-600 font-medium text-[10px] sm:text-[11px]">
              © 2025 Communauté Sainte Thérèse de l&apos;Enfant Jésus
            </p>
            <p className="text-gray-400 text-[9px] sm:text-[10px]">
              Développement intégral • Solidarité • Espérance
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}