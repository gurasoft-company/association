import Image from 'next/image';
import Link from 'next/link';

export default function FeaturedProjects() {
  const projects = [
    {
      id: 1,
      image: 'https://images.pexels.com/photos/236735/pexels-photo-236735.jpeg?w=600&h=400&fit=crop&crop=center',
      icon: '🚜',
      title: 'Tracteurs & matériel',
      description: 'Acquisition de tracteurs et d\'équipements agricoles modernes.',
      objectif: '25 000 €',
      collecte: '12 500 €',
      progress: 50,
      bgColor: 'bg-green-600/80',
      alt: 'Tracteurs et matériel agricole'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&h=400&fit=crop&crop=center',
      icon: '🌿',
      title: 'Serres agricoles',
      description: 'Construction de serres pour une production toute l\'année.',
      objectif: '15 000 €',
      collecte: '8 200 €',
      progress: 55,
      bgColor: 'bg-yellow-600/80',
      alt: 'Serres agricoles'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=600&h=400&fit=crop&crop=center',
      icon: '🔧',
      title: 'Centre de formation',
      description: 'Création d\'un centre pour former les jeunes aux métiers techniques.',
      objectif: '30 000 €',
      collecte: '5 000 €',
      progress: 17,
      bgColor: 'bg-blue-600/80',
      alt: 'Centre de formation professionnelle'
    }
  ];

  return (
    <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 bg-white rounded-2xl shadow-sm max-w-7xl mx-auto">
      <div className="max-w-6xl mx-auto">
        
        {/* En-tête */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <span className="text-green-600 font-semibold text-xs sm:text-sm uppercase tracking-wider">
            Nos projets en vedette
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2 text-gray-800">
            Des projets <span className="text-green-600">concrets à financer</span>
          </h2>
          <div className="h-1 w-12 sm:w-16 bg-green-600 mx-auto mt-3"></div>
          <p className="text-gray-600 max-w-2xl mx-auto mt-3 sm:mt-4 text-sm sm:text-base px-2">
            Nous avons déjà 5 hectares. Aidez-nous à les transformer en un centre d&apos;agriculture moderne et de formation professionnelle et technique.
          </p>
        </div>

        {/* Grille */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="relative rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
              
              <Image
                src={project.image}
                alt={project.alt}
                width={600}
                height={400}
                className="w-full h-56 sm:h-60 md:h-64 object-cover group-hover:scale-105 transition duration-500"
                priority={project.id === 1}
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              />
              
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6 z-20 text-white">
                <div className="text-3xl sm:text-4xl mb-1 sm:mb-2">{project.icon}</div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/80 mt-1 line-clamp-2">
                  {project.description}
                </p>
                
                {/* Barre de progression */}
                <div className="mt-2 sm:mt-3">
                  <div className="flex justify-between text-[10px] sm:text-xs text-white/70">
                    <span>{project.collecte}</span>
                    <span>{project.objectif}</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-1.5 sm:h-2 mt-0.5 overflow-hidden">
                    <div 
                      className="h-1.5 sm:h-2 rounded-full bg-yellow-400 transition-all duration-1000"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-[10px] sm:text-xs text-white/50 mt-0.5 block text-right">
                    {project.progress}% atteint
                  </span>
                </div>

                <div className={`mt-1 sm:mt-2 text-[10px] sm:text-xs font-semibold ${project.bgColor} backdrop-blur-sm inline-block px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full`}>
                  🎯 {project.objectif}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bouton */}
        <div className="text-center mt-8 sm:mt-10">
          <Link
            href="/dons"
            className="inline-block w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-semibold shadow-lg transition transform hover:scale-105 text-sm sm:text-base min-h-[48px] flex items-center justify-center"
          >
            💚 Soutenir ces projets
          </Link>
        </div>

        {/* Message de confiance */}
        <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-3 sm:gap-6 text-gray-500 text-xs sm:text-sm">
          <span className="flex items-center gap-1.5">
            <span className="text-green-600">✓</span> 100% transparent
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-green-600">✓</span> Impact direct
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-green-600">✓</span> Reçu fiscal
          </span>
        </div>
      </div>
    </section>
  );
}