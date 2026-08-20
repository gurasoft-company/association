import Link from 'next/link';

export default function Mission() {
  const missions = [
    {
      icon: '🌾',
      title: 'Agriculture durable',
      description: 'Moderniser les pratiques agricoles, installer des serres, acquérir des tracteurs pour une production stable et durable.',
      color: 'green'
    },
    {
      icon: '🐄',
      title: 'Élevage durable',
      description: 'Développer l\'élevage bovin, caprin, avicole et piscicole pour assurer les besoins en protéines des communautés.',
      color: 'orange'
    },
    {
      icon: '🔧',
      title: 'Formation professionnelle',
      description: 'Former les jeunes et les femmes aux métiers techniques pour leur offrir une autonomie durable.',
      color: 'blue'
    },
    {
      icon: '❤️',
      title: 'Santé maternelle et infantile',
      description: 'Promouvoir le bien-être de la femme et de l\'enfant pour des communautés en bonne santé.',
      color: 'red'
    }
  ];

  const colorClasses = {
    green: 'border-green-200 hover:border-green-300',
    orange: 'border-orange-200 hover:border-orange-300',
    blue: 'border-blue-200 hover:border-blue-300',
    red: 'border-red-200 hover:border-red-300'
  };

  return (
    <section id="mission" className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 bg-white rounded-2xl shadow-sm max-w-7xl mx-auto">
      <div className="max-w-6xl mx-auto">
        
        {/* ===== EN-TÊTE ===== */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <span className="text-green-600 font-semibold text-xs sm:text-sm uppercase tracking-wider">
            Notre vision
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2 text-gray-800">
            Une vision <span className="text-green-600">intégrale</span> pour l&apos;homme
          </h2>
          <div className="h-1 w-12 sm:w-16 md:w-20 bg-green-600 mx-auto mt-3 sm:mt-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto mt-3 sm:mt-4 text-sm sm:text-base px-2">
            Nous croyons que le développement humain passe par la formation, l&apos;autonomie et le bien-être de chaque personne.
          </p>
        </div>

        {/* ===== GRILLE DES MISSIONS ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {missions.map((mission, index) => (
            <div 
              key={index}
              className={`relative bg-white/80 backdrop-blur-sm p-5 sm:p-6 rounded-xl shadow-md border ${colorClasses[mission.color as keyof typeof colorClasses]} hover:shadow-xl transition-all duration-300 group overflow-hidden`}
            >
              {/* Fond décoratif au survol */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">{mission.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold text-green-700 mb-1.5 sm:mb-2">
                  {mission.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-xs sm:text-sm">
                  {mission.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ===== BOUTON ===== */}
        <div className="text-center mt-8 sm:mt-10">
          <Link
            href="/vision"
            className="inline-block w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-semibold shadow-lg transition transform hover:scale-105 text-sm sm:text-base min-h-[48px] flex items-center justify-center"
          >
            En savoir plus sur notre vision →
          </Link>
        </div>

        {/* ===== STATS ===== */}
        <div className="mt-8 sm:mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-green-50 rounded-xl p-4 sm:p-5 text-center border border-green-100">
            <div className="text-2xl sm:text-3xl font-bold text-green-700">25</div>
            <div className="text-xs sm:text-sm text-gray-600">Années d&apos;engagement</div>
          </div>
          <div className="bg-green-50 rounded-xl p-4 sm:p-5 text-center border border-green-100">
            <div className="text-2xl sm:text-3xl font-bold text-green-700">3</div>
            <div className="text-xs sm:text-sm text-gray-600">Diocèses</div>
          </div>
          <div className="bg-green-50 rounded-xl p-4 sm:p-5 text-center border border-green-100">
            <div className="text-2xl sm:text-3xl font-bold text-green-700">5</div>
            <div className="text-xs sm:text-sm text-gray-600">Hectares cultivés</div>
          </div>
          <div className="bg-green-50 rounded-xl p-4 sm:p-5 text-center border border-green-100">
            <div className="text-2xl sm:text-3xl font-bold text-green-700">4</div>
            <div className="text-xs sm:text-sm text-gray-600">Piliers d&apos;action</div>
          </div>
        </div>
      </div>
    </section>
  );
}