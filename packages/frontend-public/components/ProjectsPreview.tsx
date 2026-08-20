import Link from 'next/link';

const projects = [
  {
    title: "Centre de formation technique",
    description: "Formation en mécanique, couture, menuiserie, soudure et électricité pour les jeunes.",
    icon: "🔧",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    hoverColor: "hover:border-green-300",
    textColor: "text-green-700",
    tag: "Technique",
    tagColor: "bg-green-100 text-green-700"
  },
  {
    title: "Agriculture moderne",
    description: "Formation en permaculture, serres, irrigation, gestion des récoltes.",
    icon: "🌾",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    hoverColor: "hover:border-green-300",
    textColor: "text-green-700",
    tag: "Agricole",
    tagColor: "bg-green-100 text-green-700"
  },
  {
    title: "Élevage durable",
    description: "Formation à l'élevage bovin, caprin et avicole, gestion des troupeaux.",
    icon: "🐄",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    hoverColor: "hover:border-green-300",
    textColor: "text-green-700",
    tag: "Élevage",
    tagColor: "bg-green-100 text-green-700"
  }
];

export default function ProjectsPreview() {
  return (
    <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 bg-white rounded-2xl shadow-sm max-w-7xl mx-auto">
      <div className="max-w-6xl mx-auto">
        
        {/* ===== EN-TÊTE ===== */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <span className="text-green-600 font-semibold text-xs sm:text-sm uppercase tracking-wider">
            Nos formations
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2 text-gray-800">
            Nos projets de <span className="text-green-600">formation</span>
          </h2>
          <div className="h-1 w-12 sm:w-16 bg-green-600 mx-auto mt-3"></div>
          <p className="text-gray-600 max-w-2xl mx-auto mt-3 sm:mt-4 text-sm sm:text-base px-2">
            Des formations pratiques pour autonomiser les jeunes et les femmes.
          </p>
        </div>

        {/* ===== GRILLE ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {projects.map((proj, idx) => (
            <div 
              key={idx} 
              className={`${proj.bgColor} border ${proj.borderColor} ${proj.hoverColor} p-5 sm:p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group`}
            >
              {/* Icône avec cercle */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/80 rounded-full flex items-center justify-center text-3xl sm:text-4xl mb-3 sm:mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300">
                {proj.icon}
              </div>
              
              {/* Tag */}
              <span className={`inline-block ${proj.tagColor} text-[10px] sm:text-xs font-semibold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full mb-2 sm:mb-3`}>
                {proj.tag}
              </span>
              
              <h3 className={`text-lg sm:text-xl font-bold ${proj.textColor} mb-1.5 sm:mb-2`}>
                {proj.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed text-xs sm:text-sm">
                {proj.description}
              </p>
              
              {/* Lien "En savoir plus" */}
              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200/50">
                <Link 
                  href="/projets" 
                  className="text-green-600 hover:text-green-700 text-xs sm:text-sm font-medium flex items-center gap-1 group/link"
                >
                  En savoir plus
                  <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* ===== BOUTON ===== */}
        <div className="text-center mt-8 sm:mt-10">
          <Link
            href="/projets"
            className="inline-block w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-semibold shadow-lg transition transform hover:scale-105 text-sm sm:text-base min-h-[48px] flex items-center justify-center"
          >
            Voir tous nos projets →
          </Link>
        </div>
      </div>
    </section>
  );
}