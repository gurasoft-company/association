'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  // ✅ SOLUTION : Utiliser useRef pour stocker l'état précédent
  // et éviter le setState dans l'effet
  useEffect(() => {
    // Vérifier si le pathname a changé
    if (previousPathname.current !== pathname) {
      previousPathname.current = pathname;
      // ✅ Fermer le menu sans setState dans l'effet
      // En utilisant une fonction qui sera appelée après le render
      if (isMenuOpen) {
        // Utiliser un timeout pour éviter le render en cascade
        setTimeout(() => {
          setIsMenuOpen(false);
        }, 0);
      }
    }
  }, [isMenuOpen, pathname]); // ✅ Dépendance unique

  // Gestion du scroll (pas de setState ici)
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/projets', label: 'Projets' },
    { href: '/vision', label: 'Notre vision' },
    { href: '/dons', label: 'Faire un don' },
    { href: '/benevoles', label: 'Devenir bénévole' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="bg-gradient-to-r from-green-700 to-green-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2 sm:gap-3 flex-shrink-0 hover:opacity-90 transition"
            onClick={closeMenu}
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-yellow-400 rounded-lg flex items-center justify-center text-green-800 font-bold text-xs sm:text-sm shadow-md flex-shrink-0">
              CST
            </div>
            <div className="hidden xs:block">
              <span className="text-sm sm:text-base font-bold text-white leading-tight">
                Communauté <br className="hidden sm:block" />
                <span className="text-yellow-300 font-semibold">Sainte Thérèse</span>
              </span>
            </div>
            <div className="xs:hidden">
              <span className="text-sm font-bold text-white">CST</span>
            </div>
          </Link>

          {/* Navigation desktop */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    relative px-3 lg:px-4 py-2 rounded-lg text-sm lg:text-base font-medium transition-all duration-200
                    ${active 
                      ? 'bg-yellow-400 text-green-800 shadow-md scale-105 font-semibold' 
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                    }
                  `}
                >
                  {link.label}
                  {active && (
                    <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Bouton menu mobile */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors relative z-50"
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`block h-0.5 bg-white rounded-full transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 bg-white rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-white rounded-full transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {isMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            onClick={closeMenu}
          />
          
          <div className="absolute top-16 left-0 right-0 bg-green-700 shadow-xl z-40 md:hidden border-t border-white/10 animate-slideDown">
            <nav className="max-w-7xl mx-auto px-4 py-4 sm:py-6 space-y-1">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200
                      ${active 
                        ? 'bg-yellow-400 text-green-800 shadow-md font-semibold' 
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                      }
                    `}
                    onClick={closeMenu}
                  >
                    {active && <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full flex-shrink-0"></span>}
                    <span className="flex-1">{link.label}</span>
                    {active && (
                      <span className="text-xs bg-yellow-400/20 px-2 py-0.5 rounded-full text-yellow-800 font-semibold">
                        Actif
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        </>
      )}
    </header>
  );
}