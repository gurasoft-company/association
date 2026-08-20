'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import api from '../../../services/api';
import { Projet } from '../../../types';

export default function Benevoles() {
  const [projets, setProjets] = useState<Projet[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    message: '',
    idProjet: '',
    disponibilite: '',
    competences: ''
  });

  useEffect(() => {
    const fetchProjets = async () => {
      try {
        const response = await api.get('/projets');
        setProjets(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des projets', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjets();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/benevoles', {
        ...formData,
        idProjet: formData.idProjet ? parseInt(formData.idProjet) : undefined
      });
      alert('✅ Inscription envoyée avec succès !');
      setFormData({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        message: '',
        idProjet: '',
        disponibilite: '',
        competences: ''
      });
    } catch (error) {
      console.error('Erreur lors de l\'inscription', error);
      alert('❌ Erreur lors de l\'inscription');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 mx-auto"></div>
        <p className="text-gray-500 mt-4">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">

      {/* ===== EN-TÊTE AVEC IMAGE ===== */}
      <div className="relative rounded-2xl overflow-hidden shadow-xl mb-8 sm:mb-12 h-56 sm:h-72 md:h-96">
        <Image
          src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1400&h=500&fit=crop&crop=center"
          alt="Bénévoles en action"
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 100vw"
          loading="eager"
          priority
        />
        <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-center text-white px-4 sm:px-6">
          <span className="inline-block bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            🤝 Rejoindre l&apos;équipe
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3">
            Devenir <span className="text-yellow-300">bénévole</span>
          </h1>
          <p className="text-white/90 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-2">
            Donnez de votre temps et de vos compétences pour transformer des vies.
          </p>
        </div>
      </div>

      {/* ===== SECTION "POURQUOI ÊTRE BÉNÉVOLE" ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
        {[
          { icon: '🤝', title: 'Partage de compétences', desc: 'Apportez votre expertise à la communauté', img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=300&fit=crop&crop=center' },
          { icon: '💚', title: 'Impact social', desc: 'Faites une différence concrète dans des vies', img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=300&fit=crop&crop=center' },
          { icon: '🌟', title: 'Expérience humaine', desc: 'Vivez une aventure enrichissante', img: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&h=300&fit=crop&crop=center' }
        ].map((item, index) => (
          <div key={index} className="relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition group h-40 sm:h-48">
            <Image
              src={item.img}
              alt={item.title}
              fill
              className="object-cover group-hover:scale-105 transition duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center p-3 sm:p-4">
              <div className="text-3xl sm:text-4xl mb-1 sm:mb-2">{item.icon}</div>
              <h3 className="font-bold text-base sm:text-lg">{item.title}</h3>
              <p className="text-xs sm:text-sm text-white/80 mt-1">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ===== SECTION "ILS SONT DÉJÀ BÉNÉVOLES" ===== */}
      <div className="relative rounded-2xl overflow-hidden mb-8 sm:mb-12 p-6 sm:p-8 bg-gradient-to-r from-green-700 to-green-500">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10">
          <div className="text-center mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              🌟 Ils sont déjà <span className="text-yellow-300">bénévoles</span>
            </h2>
            <p className="text-white/80 text-xs sm:text-sm">Rejoignez une communauté engagée et solidaire</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {[
              { initial: 'M', name: 'Marie Dupont', tag: '🌾 Agriculture', color: 'green' },
              { initial: 'J', name: 'Jean Koffi', tag: '📚 Formation', color: 'yellow' },
              { initial: 'A', name: 'Ama Adjovi', tag: '❤️ Santé', color: 'green' }
            ].map((donor, index) => (
              <div key={index} className="flex items-center gap-2 sm:gap-3 bg-white/90 backdrop-blur-sm px-3 sm:px-5 py-2 sm:py-3 rounded-full shadow-md">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-green-500 to-green-700 text-white flex items-center justify-center text-xs sm:text-sm font-semibold shadow-md flex-shrink-0">
                  {donor.initial}
                </div>
                <span className="text-xs sm:text-sm font-medium text-gray-700 truncate max-w-[80px] sm:max-w-none">
                  {donor.name}
                </span>
                <span className={`text-[10px] sm:text-xs ${
                  donor.color === 'green' ? 'bg-green-50 text-green-600 border-green-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                } px-2 sm:px-2.5 py-0.5 rounded-full border whitespace-nowrap`}>
                  {donor.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== BANDEAU D'INFORMATION ===== */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 sm:mb-8 px-2">
        <div className="bg-white px-3 sm:px-6 py-2 sm:py-3 rounded-full shadow-sm border border-gray-200 text-[10px] sm:text-sm text-gray-600 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <span className="font-medium">🤝 Engagement bénévole</span>
          <span className="text-gray-300 hidden sm:inline">|</span>
          <span className="flex items-center gap-1">📚 Formation possible</span>
          <span className="text-gray-300 hidden sm:inline">|</span>
          <span className="flex items-center gap-1">🌍 Communauté solidaire</span>
        </div>
      </div>

      {/* ===== SECTION FORMULAIRE ===== */}
      <div className="relative rounded-2xl overflow-hidden mb-8 sm:mb-12 max-w-3xl mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-green-500"></div>
        <div className="absolute inset-0 bg-gray-800/40"></div>
        
        <div className="relative z-10 p-6 sm:p-8 md:p-10">
          <div className="text-center mb-6 sm:mb-8">
            <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium mb-2 sm:mb-3">
              🤝 Agir maintenant
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              Devenir acteur du <span className="text-yellow-300">changement</span>
            </h2>
            <p className="text-white/80 text-xs sm:text-sm mt-1 sm:mt-2 px-2">
              Rejoignez notre équipe de bénévoles et apportez votre pierre à l&apos;édifice.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">

            {/* === Coordonnées === */}
            <div>
              <h3 className="text-xs sm:text-sm font-semibold text-white/90 mb-2 sm:mb-3">Vos coordonnées</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Nom"
                  value={formData.nom}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  className="w-full p-3 sm:p-2.5 bg-white/15 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 text-sm sm:text-base"
                  required
                />
                <input
                  type="text"
                  placeholder="Prénom"
                  value={formData.prenom}
                  onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                  className="w-full p-3 sm:p-2.5 bg-white/15 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 text-sm sm:text-base"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-3 sm:p-2.5 bg-white/15 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 text-sm sm:text-base"
                  required
                />
                <input
                  type="tel"
                  placeholder="Téléphone"
                  value={formData.telephone}
                  onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                  className="w-full p-3 sm:p-2.5 bg-white/15 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 text-sm sm:text-base"
                />
              </div>
            </div>

            {/* === Compétences === */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1.5">Vos compétences</label>
              <input
                type="text"
                placeholder="Ex: Agriculture, Comptabilité, Communication, Formateur..."
                value={formData.competences}
                onChange={(e) => setFormData({ ...formData, competences: e.target.value })}
                className="w-full p-3 sm:p-2.5 bg-white/15 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 text-sm sm:text-base"
              />
            </div>

            {/* === Disponibilité === */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1.5">Votre disponibilité</label>
              <select
                value={formData.disponibilite}
                onChange={(e) => setFormData({ ...formData, disponibilite: e.target.value })}
                className="w-full p-3 sm:p-2.5 bg-white/15 backdrop-blur-sm border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50 text-sm sm:text-base"
              >
                <option value="" className="text-gray-700">Sélectionnez votre disponibilité</option>
                <option value="occasionnelle" className="text-gray-700">Occasionnelle</option>
                <option value="hebdomadaire" className="text-gray-700">Hebdomadaire</option>
                <option value="mensuelle" className="text-gray-700">Mensuelle</option>
                <option value="ponctuelle" className="text-gray-700">Ponctuelle</option>
                <option value="disponible" className="text-gray-700">Disponible</option>
              </select>
            </div>

            {/* === Projet === */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1.5">Projet d&apos;intérêt</label>
              <select
                value={formData.idProjet}
                onChange={(e) => setFormData({ ...formData, idProjet: e.target.value })}
                className="w-full p-3 sm:p-2.5 bg-white/15 backdrop-blur-sm border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50 text-sm sm:text-base"
              >
                <option value="" className="text-gray-700">Sélectionnez un projet</option>
                {projets.map((p) => (
                  <option key={p.idProjet} value={p.idProjet} className="text-gray-700">{p.nom}</option>
                ))}
              </select>
            </div>

            {/* === Message === */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1.5">Votre message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full p-3 sm:p-2.5 bg-white/15 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 text-sm sm:text-base resize-none"
                rows={4}
                placeholder="Dites-nous pourquoi vous voulez nous rejoindre et ce que vous pouvez apporter..."
              />
            </div>

            {/* === Bouton === */}
            <button
              type="submit"
              disabled={submitting}
              className={`w-full font-semibold py-4 sm:py-3.5 rounded-lg transition duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base min-h-[52px] sm:min-h-[48px] ${
                submitting 
                  ? 'bg-gray-400 text-gray-700 cursor-not-allowed' 
                  : 'bg-yellow-400 text-green-800 hover:bg-yellow-300'
              }`}
            >
              {submitting ? '⏳ Envoi en cours...' : '🤝 Devenir bénévole'}
            </button>

            {/* === Infos supplémentaires === */}
            <div className="text-center text-white/60 text-[10px] sm:text-xs">
              <p>📧 Un email de confirmation vous sera envoyé dans les 48h</p>
            </div>
          </form>
        </div>
      </div>

      {/* ===== BAS DE PAGE ===== */}
      <div className="text-center mt-8 sm:mt-10">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 text-[10px] sm:text-sm text-gray-500">
          <span className="flex items-center gap-1 bg-gray-50 px-2 sm:px-3 py-1 rounded-full">🤝 Engagement bénévole</span>
          <span className="flex items-center gap-1 bg-gray-50 px-2 sm:px-3 py-1 rounded-full">📚 Formation possible</span>
          <span className="flex items-center gap-1 bg-gray-50 px-2 sm:px-3 py-1 rounded-full">🌍 Communauté solidaire</span>
        </div>
        <p className="text-xs sm:text-sm text-gray-400 mt-3 sm:mt-4 px-4">
          🙏 Merci de vouloir rejoindre notre équipe. Chaque bénévole est une force pour nos projets.
        </p>
      </div>

    </div>
  );
}