const stats = [
  { label: "Jeunes formés", value: "+500", icon: "👨‍🎓" },
  { label: "Centres de formation", value: "3", icon: "🏫" },
  { label: "Métiers enseignés", value: "8", icon: "🛠️" },
  { label: "Communautés touchées", value: "12", icon: "🏘️" },
];

export default function Stats() {
  return (
    <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 bg-gradient-to-br from-green-50 to-green-100/50 rounded-2xl max-w-7xl mx-auto">
      <div className="max-w-6xl mx-auto">
        
        {/* ===== EN-TÊTE ===== */}
        <div className="text-center mb-8 sm:mb-10">
          <span className="inline-block bg-green-100 text-green-700 text-xs sm:text-sm font-semibold px-4 py-1 rounded-full mb-3">
            📊 Notre impact
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
            Quelques <span className="text-green-600">chiffres clés</span>
          </h2>
          <div className="h-1 w-12 sm:w-16 bg-green-600 mx-auto mt-3"></div>
          <p className="text-gray-600 max-w-2xl mx-auto mt-3 sm:mt-4 text-sm sm:text-base px-2">
            Depuis 25 ans, nous transformons des vies grâce à la formation et au développement durable.
          </p>
        </div>

        {/* ===== GRILLE ===== */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 text-center">
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className="bg-white p-4 sm:p-5 md:p-6 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-green-100 hover:border-green-300 group hover:-translate-y-1"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto bg-gradient-to-br from-green-100 to-green-50 rounded-full flex items-center justify-center text-3xl sm:text-4xl mb-2 sm:mb-3 group-hover:scale-110 group-hover:bg-green-200 transition-all duration-300">
                {stat.icon}
              </div>
              
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-700 mb-0.5 sm:mb-1 group-hover:text-green-600 transition">
                {stat.value}
              </div>
              
              <div className="text-gray-600 text-xs sm:text-sm font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* ===== BARRE DE PROGRESSION GLOBALE ===== */}
        <div className="mt-8 sm:mt-10 bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-green-100">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎯</span>
              <span className="text-sm sm:text-base font-medium text-gray-700">
                Objectif 2025 : 1 000 jeunes formés
              </span>
            </div>
            <div className="w-full sm:w-auto flex items-center gap-4">
              <div className="w-full sm:w-48 bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <div 
                  className="h-2.5 rounded-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-1000"
                  style={{ width: '65%' }}
                ></div>
              </div>
              <span className="text-sm font-bold text-green-700">65%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}