'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import api from '../../../services/api';
import { Projet, Besoin, Don } from '../../../types';
import { API_BASE_URL } from '../../../config/api';

const fakeDonors = [
  { id: 1, prenom: 'Marie', nom: 'Dupont', montant: 50 },
  { id: 2, prenom: 'Jean', nom: 'Koffi', montant: 100 },
  { id: 3, prenom: 'Ama', nom: 'Adjovi', montant: 25 },
  { id: 4, prenom: 'Papa', nom: 'Amétépé', montant: 75 },
  { id: 5, prenom: 'Grace', nom: 'Mensah', montant: 200 },
  { id: 6, prenom: 'David', nom: 'Agbo', montant: 150 },
];

export default function Dons() {
  const [projets, setProjets] = useState<Projet[]>([]);
  const [besoins, setBesoins] = useState<Besoin[]>([]);
  const [dons, setDons] = useState<Don[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [currency, setCurrency] = useState<'EUR' | 'USD'>('EUR');
  const [isMonthly, setIsMonthly] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal' | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    type_don: 'especes',
    montant: '',
    description: '',
    valeur_estimee: '',
    idProjet: '',
    idBesoin: '',
    nom: '',
    prenom: '',
    email: '',
    telephone: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projetsRes, besoinsRes, donsRes] = await Promise.all([
          api.get('/projets'),
          api.get('/besoins'),
          api.get('/dons')
        ]);
        setProjets(projetsRes.data);
        setBesoins(besoinsRes.data);
        setDons(donsRes.data);
      } catch (error) {
        console.error('Erreur lors du chargement', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getTotalCollected = (projetId: number) => {
    return dons
      .filter(d => d.idProjet === projetId)
      .reduce((sum, d) => sum + (d.montant || 0), 0);
  };

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setFormData({ ...formData, montant: amount.toString() });
    setCustomAmount('');
  };

  const handleCustomAmount = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
    setFormData({ ...formData, montant: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentMethod) {
      alert('Veuillez sélectionner un moyen de paiement');
      return;
    }
    setSubmitting(true);
    try {
      const donData = {
        ...formData,
        montant: formData.montant ? parseFloat(formData.montant) : undefined,
        devise: currency,
        isMonthly,
        paymentMethod,
        Donateur: {
          nom: formData.nom,
          prenom: formData.prenom,
          email: formData.email,
          telephone: formData.telephone
        }
      };

      const response = await api.post('/dons', donData);
      
      if (paymentMethod === 'stripe') {
        window.location.href = response.data.stripeUrl || 'https://stripe.com';
      } else if (paymentMethod === 'paypal') {
        window.location.href = response.data.paypalUrl || 'https://paypal.com';
      }
      
      alert(isMonthly ? '✅ Don mensuel configuré !' : '✅ Don envoyé avec succès !');
    } catch (error) {
      console.error('Erreur lors de l\'envoi du don', error);
      alert('❌ Erreur lors de l\'envoi du don');
    } finally {
      setSubmitting(false);
    }
  };

  const suggestedAmounts = [5, 10, 25, 50, 100];
  const currencySymbol = currency === 'EUR' ? '€' : '$';
  const allDonors = fakeDonors;

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

      {/* ===== EN-TÊTE ===== */}
      <div className="relative rounded-2xl overflow-hidden shadow-xl mb-8 sm:mb-12 h-56 sm:h-72 md:h-96">
        <Image
          src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1400&h=500&fit=crop&crop=center"
          alt="Don et solidarité"
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 100vw"
          loading="eager"
          priority
        />
        <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-center text-white px-4 sm:px-6">
          <span className="inline-block bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            🤝 Soutenir notre mission
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3">
            Faire un <span className="text-yellow-300">don</span>
          </h1>
          <p className="text-white/90 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-2">
            Votre générosité transforme des vies.
          </p>
        </div>
      </div>

      {/* ===== POURQUOI DONNER ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
        {[
          { icon: '🌾', title: 'Agriculture durable', desc: 'Soutenez des projets agricoles modernes', img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=300&fit=crop&crop=center' },
          { icon: '👩‍🎓', title: 'Formation', desc: 'Offrez une formation aux jeunes et aux femmes', img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=300&fit=crop&crop=center' },
          { icon: '❤️', title: 'Santé', desc: 'Soutenez la santé maternelle et infantile', img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=300&fit=crop&crop=center' }
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

      {/* ===== AVANCEMENT DES PROJETS ===== */}
      <div className="mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-4 sm:mb-6 px-2">
          📊 Avancement des <span className="text-green-600">collectes</span>
        </h2>
        <div className="space-y-3 sm:space-y-4 max-w-3xl mx-auto px-2 sm:px-0">
          {projets.map((projet) => {
            const collected = getTotalCollected(projet.idProjet);
            const target = projet.objectif || 10000;
            const percentage = Math.min((collected / target) * 100, 100);
            return (
              <div key={projet.idProjet} className="bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-1 gap-1 sm:gap-0">
                  <span className="font-medium text-gray-700 text-sm sm:text-base">{projet.nom}</span>
                  <span className="text-xs sm:text-sm font-semibold text-green-600">
                    {collected} {currencySymbol} / {target} {currencySymbol}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 sm:h-3 overflow-hidden">
                  <div
                    className="h-2.5 sm:h-3 rounded-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <p className="text-[10px] sm:text-xs text-gray-400 mt-1 text-right">
                  {percentage.toFixed(0)}% atteint
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ===== DONATEURS ===== */}
      <div className="relative rounded-2xl overflow-hidden mb-8 sm:mb-12 p-6 sm:p-8 bg-gradient-to-r from-green-700 to-green-500">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10">
          <div className="text-center mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              🙏 Merci à nos <span className="text-yellow-300">généreux donateurs</span>
            </h2>
            <p className="text-white/80 text-xs sm:text-sm">Ils ont déjà fait la différence. Rejoignez-les !</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {allDonors.slice(0, 6).map((donor) => (
              <div
                key={donor.id}
                className="flex items-center gap-2 sm:gap-3 bg-white/90 backdrop-blur-sm px-3 sm:px-5 py-2 sm:py-3 rounded-full shadow-md hover:shadow-lg transition border border-white/30"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-green-500 to-green-700 text-white flex items-center justify-center text-xs sm:text-sm font-semibold shadow-md flex-shrink-0">
                  {(donor.prenom?.charAt(0) || donor.nom?.charAt(0) || '?').toUpperCase()}
                </div>
                <span className="text-xs sm:text-sm font-medium text-gray-700 truncate max-w-[60px] sm:max-w-none">
                  {donor.prenom} {donor.nom}
                </span>
                <span className="text-[10px] sm:text-xs font-semibold text-green-600 bg-green-50 px-2 sm:px-2.5 py-0.5 rounded-full border border-green-200 whitespace-nowrap">
                  +{donor.montant} {currencySymbol}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== BANDEAU PAIEMENT ===== */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 sm:mb-8 px-2">
        <div className="bg-white px-3 sm:px-6 py-2 sm:py-3 rounded-full shadow-sm border border-gray-200 text-[10px] sm:text-sm text-gray-600 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <span className="font-medium">✅ Paiement sécurisé</span>
          <span className="text-gray-300 hidden sm:inline">|</span>
          <span className="flex items-center gap-1">💳 PayPal</span>
          <span className="text-gray-300 hidden sm:inline">|</span>
          <span className="flex items-center gap-1">💳 Stripe</span>
        </div>
      </div>

      {/* ===== FORMULAIRE ===== */}
      <div className="relative rounded-2xl overflow-hidden mb-8 sm:mb-12 max-w-3xl mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-green-500"></div>
        <div className="absolute inset-0 bg-gray-800/40"></div>
        
        <div className="relative z-10 p-6 sm:p-8 md:p-10">
          <div className="text-center mb-6 sm:mb-8">
            <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium mb-2 sm:mb-3">
              💚 Agir maintenant
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              Devenir acteur du <span className="text-yellow-300">changement</span>
            </h2>
            <p className="text-white/80 text-xs sm:text-sm mt-1 sm:mt-2 px-2">
              Chaque don, petit ou grand, transforme des vies.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">

            {/* Devise et montant */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1.5">Devise</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setCurrency('EUR')}
                    className={`flex-1 py-3 sm:py-2.5 rounded-lg text-sm font-medium transition min-h-[44px] ${
                      currency === 'EUR'
                        ? 'bg-white text-green-700 shadow-md'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    € Euro
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrency('USD')}
                    className={`flex-1 py-3 sm:py-2.5 rounded-lg text-sm font-medium transition min-h-[44px] ${
                      currency === 'USD'
                        ? 'bg-white text-green-700 shadow-md'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    $ Dollar
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1.5">Montant</label>
                <div className="flex flex-wrap gap-1.5">
                  {suggestedAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => handleAmountSelect(amount)}
                      className={`px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition min-h-[36px] sm:min-h-[40px] ${
                        selectedAmount === amount
                          ? 'bg-white text-green-700 shadow-md'
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      {amount}{currencySymbol}
                    </button>
                  ))}
                  <input
                    type="number"
                    placeholder="Autre"
                    value={customAmount}
                    onChange={(e) => handleCustomAmount(e.target.value)}
                    className="w-16 sm:w-20 px-2 py-1.5 sm:py-2 bg-white/20 border border-white/30 rounded-lg text-white text-xs sm:text-sm placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 min-h-[36px] sm:min-h-[40px]"
                    min="1"
                    step="1"
                  />
                </div>
              </div>
            </div>

            {/* Récapitulatif */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-white/15 backdrop-blur-sm p-3 rounded-lg text-center border border-white/20">
                <p className="text-[10px] sm:text-xs text-white/70">Montant du don</p>
                <p className="text-xl sm:text-2xl font-bold text-white">
                  {formData.montant ? `${formData.montant} ${currencySymbol}` : '0'}
                  {isMonthly && ' /mois'}
                </p>
              </div>

              <div className="flex items-center gap-3 bg-white/15 backdrop-blur-sm p-3 rounded-lg border border-white/20">
                <input
                  type="checkbox"
                  id="monthly"
                  checked={isMonthly}
                  onChange={(e) => setIsMonthly(e.target.checked)}
                  className="w-5 h-5 text-yellow-400 focus:ring-yellow-300 rounded cursor-pointer flex-shrink-0"
                />
                <label htmlFor="monthly" className="text-xs sm:text-sm text-white/80 cursor-pointer">
                  🔄 Don mensuel
                </label>
              </div>
            </div>

            {/* Type de don */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1.5">Type de don</label>
              <div className="flex flex-wrap gap-3">
                <label className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white/15 backdrop-blur-sm rounded-lg border border-white/20 cursor-pointer hover:bg-white/25 transition min-h-[44px]">
                  <input
                    type="radio"
                    value="especes"
                    checked={formData.type_don === 'especes'}
                    onChange={(e) => setFormData({ ...formData, type_don: e.target.value })}
                    className="text-yellow-400 focus:ring-yellow-300"
                  />
                  <span className="text-xs sm:text-sm text-white">💰 Espèces</span>
                </label>
                <label className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white/15 backdrop-blur-sm rounded-lg border border-white/20 cursor-pointer hover:bg-white/25 transition min-h-[44px]">
                  <input
                    type="radio"
                    value="nature"
                    checked={formData.type_don === 'nature'}
                    onChange={(e) => setFormData({ ...formData, type_don: e.target.value })}
                    className="text-yellow-400 focus:ring-yellow-300"
                  />
                  <span className="text-xs sm:text-sm text-white">📦 Nature</span>
                </label>
              </div>
            </div>

            {/* Description nature */}
            {formData.type_don === 'nature' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Description (ex: Tracteur)"
                  className="w-full p-3 sm:p-2.5 bg-white/15 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 text-sm sm:text-base"
                  required
                />
                <input
                  type="number"
                  value={formData.valeur_estimee}
                  onChange={(e) => setFormData({ ...formData, valeur_estimee: e.target.value })}
                  placeholder={`Valeur estimée (${currencySymbol})`}
                  className="w-full p-3 sm:p-2.5 bg-white/15 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 text-sm sm:text-base"
                />
              </div>
            )}

            {/* Projet */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1.5">Projet à soutenir</label>
              <select
                value={formData.idProjet}
                onChange={(e) => setFormData({ ...formData, idProjet: e.target.value })}
                className="w-full p-3 sm:p-2.5 bg-white/15 backdrop-blur-sm border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50 text-sm sm:text-base"
                required
              >
                <option value="" className="text-gray-700">Sélectionnez un projet</option>
                {projets.map((p) => (
                  <option key={p.idProjet} value={p.idProjet} className="text-gray-700">{p.nom}</option>
                ))}
              </select>
            </div>

            {/* Besoin */}
            {formData.type_don === 'nature' && (
              <div>
                <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1.5">Besoin spécifique</label>
                <select
                  value={formData.idBesoin}
                  onChange={(e) => setFormData({ ...formData, idBesoin: e.target.value })}
                  className="w-full p-3 sm:p-2.5 bg-white/15 backdrop-blur-sm border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50 text-sm sm:text-base"
                >
                  <option value="" className="text-gray-700">Sélectionnez un besoin</option>
                  {besoins.filter(b => b.idProjet === parseInt(formData.idProjet)).map((b) => (
                    <option key={b.idBesoin} value={b.idBesoin} className="text-gray-700">{b.description}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Coordonnées */}
            <div className="pt-2">
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

            {/* Paiement */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1.5">Moyen de paiement</label>
              <div className="flex flex-wrap gap-3">
                <label
                  className={`flex items-center gap-2 px-4 py-3 sm:py-2.5 rounded-lg border cursor-pointer transition min-h-[44px] ${
                    paymentMethod === 'stripe'
                      ? 'bg-white/30 border-yellow-400/50'
                      : 'bg-white/15 border-white/20 hover:bg-white/25'
                  }`}
                >
                  <input
                    type="radio"
                    value="stripe"
                    checked={paymentMethod === 'stripe'}
                    onChange={(e) => setPaymentMethod(e.target.value as 'stripe')}
                    className="text-yellow-400 focus:ring-yellow-300"
                  />
                  <span className="text-xs sm:text-sm text-white">💳 Stripe</span>
                </label>
                <label
                  className={`flex items-center gap-2 px-4 py-3 sm:py-2.5 rounded-lg border cursor-pointer transition min-h-[44px] ${
                    paymentMethod === 'paypal'
                      ? 'bg-white/30 border-yellow-400/50'
                      : 'bg-white/15 border-white/20 hover:bg-white/25'
                  }`}
                >
                  <input
                    type="radio"
                    value="paypal"
                    checked={paymentMethod === 'paypal'}
                    onChange={(e) => setPaymentMethod(e.target.value as 'paypal')}
                    className="text-yellow-400 focus:ring-yellow-300"
                  />
                  <span className="text-xs sm:text-sm text-white">💳 PayPal</span>
                </label>
              </div>
            </div>

            {/* Bouton */}
            <button
              type="submit"
              disabled={submitting}
              className={`w-full font-semibold py-4 sm:py-3.5 rounded-lg transition duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base min-h-[52px] sm:min-h-[48px] ${
                submitting
                  ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                  : 'bg-yellow-400 text-green-800 hover:bg-yellow-300'
              }`}
            >
              {submitting ? '⏳ Envoi en cours...' : (isMonthly ? '💚 S\'abonner' : '💚 Faire un don')}
            </button>
          </form>
        </div>
      </div>

      {/* ===== BAS DE PAGE ===== */}
      <div className="text-center mt-8 sm:mt-10">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 text-[10px] sm:text-sm text-gray-500">
          <span className="flex items-center gap-1 bg-gray-50 px-2 sm:px-3 py-1 rounded-full">🔒 Paiement sécurisé</span>
          <span className="flex items-center gap-1 bg-gray-50 px-2 sm:px-3 py-1 rounded-full">💳 PayPal & Stripe</span>
          <span className="flex items-center gap-1 bg-gray-50 px-2 sm:px-3 py-1 rounded-full">📧 Reçu fiscal</span>
        </div>
        <p className="text-xs sm:text-sm text-gray-400 mt-3 sm:mt-4 px-4">
          🙏 Merci pour votre générosité. Chaque don compte.
        </p>
      </div>

    </div>
  );
}