export default function CallToAction() {
  return (
    <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 bg-gradient-to-r from-green-700 to-green-500 text-white rounded-2xl shadow-lg text-center max-w-7xl mx-auto">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
        Soutenez notre <span className="text-yellow-300">mission</span>
      </h2>
      <p className="text-sm sm:text-base md:text-lg mb-5 sm:mb-6 max-w-2xl mx-auto px-2">
        Chaque don, chaque engagement fait la différence. Rejoignez-nous pour construire un avenir durable.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
        <a 
          href="/dons" 
          className="w-full sm:w-auto bg-white text-green-700 hover:bg-gray-100 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-semibold shadow-lg hover:shadow-xl transition transform hover:scale-105 text-sm sm:text-base min-h-[48px] flex items-center justify-center"
        >
          💚 Faire un don
        </a>
        <a 
          href="/benevoles" 
          className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-green-700 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-semibold transition transform hover:scale-105 text-sm sm:text-base min-h-[48px] flex items-center justify-center"
        >
          🤝 Devenir bénévole
        </a>
      </div>
      
      {/* ✅ Ajout d'un petit message de confiance */}
      <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-3 sm:gap-6 text-white/70 text-xs sm:text-sm">
        <span className="flex items-center gap-1.5">
          <span className="text-yellow-300">✓</span> 100% sécurisé
        </span>
        <span className="flex items-center gap-1.5">
          <span className="text-yellow-300">✓</span> Reçu fiscal
        </span>
        <span className="flex items-center gap-1.5">
          <span className="text-yellow-300">✓</span> Impact direct
        </span>
      </div>
    </section>
  );
}