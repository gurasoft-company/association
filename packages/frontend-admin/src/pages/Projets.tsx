import { useEffect, useState, useRef } from 'react';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';
import api from '../services/api';
import { formatDate } from '../utils/dateUtils';

interface Projet {
  idProjet: number;
  nom: string;
  description: string;
  objectif: number;
  date_debut: string;
  date_fin: string;
  statut: string;
}

interface Besoin {
  idBesoin: number;
  description: string;
  quantite: number;
  unite: string;
  valeur_estimee: number;
  idProjet: number;
}

interface ImageProjet {
  idImage: number;
  url: string;
  titre: string;
  idProjet: number;
}

export default function Projets() {
  const [projets, setProjets] = useState<Projet[]>([]);
  const [besoins, setBesoins] = useState<{ [key: number]: Besoin[] }>({});
  const [images, setImages] = useState<{ [key: number]: ImageProjet[] }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedProjetId, setSelectedProjetId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // État du formulaire principal
  const [formData, setFormData] = useState({
    nom: '',
    description: '',
    objectif: '',
    date_debut: '',
    date_fin: '',
    statut: 'en_cours',
  });

  // État pour les images du formulaire de création
  const [formImages, setFormImages] = useState<{ url: string; titre: string; file?: File }[]>([]);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageTitre, setNewImageTitre] = useState('');
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [uploading, setUploading] = useState(false);

  // Référence pour l'input file
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [newBesoin, setNewBesoin] = useState<{ [key: number]: { description: string; quantite: string; unite: string; valeur_estimee: string } }>({});
  const [newImage, setNewImage] = useState<{ [key: number]: { url: string; titre: string } }>({});

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/projets');
      setProjets(response.data);

      for (const projet of response.data) {
        try {
          const [besoinsRes, imagesRes] = await Promise.all([
            api.get(`/besoins/projet/${projet.idProjet}`),
            api.get(`/images/projet/${projet.idProjet}`),
          ]);
          setBesoins((prev) => ({ ...prev, [projet.idProjet]: besoinsRes.data }));
          setImages((prev) => ({ ...prev, [projet.idProjet]: imagesRes.data }));
        } catch (err) {
          console.error(`Erreur chargement données projet ${projet.idProjet}`, err);
        }
      }
    } catch (err) {
      console.error('Erreur chargement projets:', err);
      setError('Erreur lors du chargement des projets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Fonction pour convertir un fichier en URL (aperçu)
  const fileToUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Fonction pour ajouter une image depuis un fichier
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Vérifier le type de fichier
    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner une image (JPEG, PNG, GIF, etc.)');
      return;
    }

    // Vérifier la taille (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('L\'image ne doit pas dépasser 5MB');
      return;
    }

    setNewImageFile(file);
    // Afficher un aperçu
    const url = await fileToUrl(file);
    setNewImageUrl(url);
  };

  // Fonction pour ajouter une image (URL ou fichier)
  const handleAddFormImage = async () => {
    if (newImageFile) {
      // Ajout depuis un fichier
      const url = await fileToUrl(newImageFile);
      setFormImages([...formImages, { 
        url, 
        titre: newImageTitre.trim() || newImageFile.name,
        file: newImageFile 
      }]);
      setNewImageFile(null);
      setNewImageUrl('');
      setNewImageTitre('');
      if (fileInputRef.current) fileInputRef.current.value = '';
      setCurrentImageIndex(0);
    } else if (newImageUrl.trim()) {
      // Ajout depuis une URL
      setFormImages([...formImages, { 
        url: newImageUrl.trim(), 
        titre: newImageTitre.trim() || 'Image' 
      }]);
      setNewImageUrl('');
      setNewImageTitre('');
      setCurrentImageIndex(0);
    } else {
      alert('Veuillez entrer une URL ou sélectionner une image');
    }
  };

  // Fonction pour supprimer une image du formulaire
  const handleRemoveFormImage = (index: number) => {
    setFormImages(formImages.filter((_, i) => i !== index));
    if (currentImageIndex >= formImages.length - 1) {
      setCurrentImageIndex(Math.max(0, formImages.length - 2));
    }
  };

  // Fonction pour uploader une image sur le serveur (avec gestion de fichier)
  const uploadImageToServer = async (projetId: number, image: { url: string; titre: string; file?: File }) => {
    if (image.file) {
      // Upload de fichier via FormData
      const formData = new FormData();
      formData.append('image', image.file);
      formData.append('titre', image.titre);
      formData.append('idProjet', projetId.toString());

      const response = await api.post('/images/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } else {
      // Upload d'URL
      const response = await api.post('/images', {
        url: image.url,
        titre: image.titre || '',
        idProjet: projetId,
      });
      return response.data;
    }
  };

  // Fonction de soumission avec upload d'images
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setUploading(true);
    setError(null);
    setSuccess(null);

    try {
      if (!formData.nom.trim()) {
        setError('Le nom du projet est requis');
        setIsSubmitting(false);
        setUploading(false);
        return;
      }
      if (!formData.objectif || parseFloat(formData.objectif) <= 0) {
        setError('L\'objectif doit être un montant positif');
        setIsSubmitting(false);
        setUploading(false);
        return;
      }

      const payload = {
        nom: formData.nom.trim(),
        description: formData.description.trim(),
        objectif: parseFloat(formData.objectif),
        date_debut: formData.date_debut || undefined,
        date_fin: formData.date_fin || undefined,
        statut: formData.statut,
      };

      // Créer le projet
      const response = await api.post('/projets', payload);
      const newProjetId = response.data.idProjet;

      // Upload des images une par une (avec fichiers ou URLs)
      if (formImages.length > 0) {
        for (const img of formImages) {
          await uploadImageToServer(newProjetId, img);
        }
      }

      setSuccess(`✅ Projet créé avec succès avec ${formImages.length} image(s) !`);
      setShowForm(false);
      setFormData({ nom: '', description: '', objectif: '', date_debut: '', date_fin: '', statut: 'en_cours' });
      setFormImages([]);
      setNewImageUrl('');
      setNewImageTitre('');
      setNewImageFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      await fetchData();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error('Erreur création projet:', err);
      setError('Erreur lors de la création du projet');
    } finally {
      setIsSubmitting(false);
      setUploading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Supprimer ce projet ?')) return;
    try {
      await api.delete(`/projets/${id}`);
      await fetchData();
    } catch (err) {
      console.error('Erreur suppression projet:', err);
      setError('Erreur lors de la suppression du projet');
    }
  };

  const handleAddBesoin = async (projetId: number) => {
    const data = newBesoin[projetId];
    if (!data || !data.description || !data.quantite || !data.unite) {
      alert('Veuillez remplir tous les champs (description, quantité, unité)');
      return;
    }
    try {
      await api.post(`/besoins/projet/${projetId}`, {
        description: data.description,
        quantite: parseInt(data.quantite),
        unite: data.unite,
        valeur_estimee: parseFloat(data.valeur_estimee) || 0,
      });
      setNewBesoin((prev) => ({ 
        ...prev, 
        [projetId]: { description: '', quantite: '', unite: '', valeur_estimee: '' } 
      }));
      await fetchData();
      setSuccess('✅ Besoin ajouté avec succès !');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error('Erreur ajout besoin:', err);
      setError('Erreur lors de l\'ajout du besoin');
    }
  };

  const handleDeleteBesoin = async (besoinId: number) => {
    if (!confirm('Supprimer ce besoin ?')) return;
    try {
      await api.delete(`/besoins/${besoinId}`);
      await fetchData();
      setSuccess('✅ Besoin supprimé avec succès !');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error('Erreur suppression besoin:', err);
      setError('Erreur lors de la suppression du besoin');
    }
  };

  const handleAddImage = async (projetId: number) => {
    const data = newImage[projetId];
    if (!data || !data.url) {
      alert('Veuillez entrer une URL d\'image');
      return;
    }
    try {
      await api.post('/images', {
        url: data.url,
        titre: data.titre || '',
        idProjet: projetId,
      });
      setNewImage((prev) => ({ ...prev, [projetId]: { url: '', titre: '' } }));
      await fetchData();
      setSuccess('✅ Image ajoutée avec succès !');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error('Erreur ajout image:', err);
      setError('Erreur lors de l\'ajout de l\'image');
    }
  };

  const handleDeleteImage = async (imageId: number) => {
    if (!confirm('Supprimer cette image ?')) return;
    try {
      await api.delete(`/images/${imageId}`);
      await fetchData();
      setSuccess('✅ Image supprimée avec succès !');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error('Erreur suppression image:', err);
      setError('Erreur lors de la suppression de l\'image');
    }
  };

  const selectedProjet = projets.find((p) => p.idProjet === selectedProjetId);

  // Navigation du carrousel
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % formImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + formImages.length) % formImages.length);
  };

  return (
    <ProtectedRoute>
      <Layout>
        <div className="p-6">

          {/* ==================== HEADER ==================== */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Gestion des projets</h1>
            <button
              onClick={() => {
                setShowForm(!showForm);
                if (!showForm) {
                  setFormImages([]);
                  setNewImageUrl('');
                  setNewImageTitre('');
                  setNewImageFile(null);
                  setCurrentImageIndex(0);
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              {showForm ? 'Annuler' : '+ Nouveau projet'}
            </button>
          </div>

          {/* ==================== MESSAGES ==================== */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              ❌ {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
              {success}
            </div>
          )}

          {/* ==================== FORMULAIRE AVEC CARROUSEL ==================== */}
          {showForm && (
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow border border-gray-200 mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Nouveau projet</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom du projet <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Nom du projet"
                    value={formData.nom}
                    onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Objectif (€) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Objectif (€)"
                    value={formData.objectif}
                    onChange={(e) => setFormData({ ...formData, objectif: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    placeholder="Description du projet"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date de début</label>
                  <input
                    type="date"
                    value={formData.date_debut}
                    onChange={(e) => setFormData({ ...formData, date_debut: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date de fin</label>
                  <input
                    type="date"
                    value={formData.date_fin}
                    onChange={(e) => setFormData({ ...formData, date_fin: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                  <select
                    value={formData.statut}
                    onChange={(e) => setFormData({ ...formData, statut: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="en_cours">En cours</option>
                    <option value="termine">Terminé</option>
                    <option value="en_attente">En attente</option>
                  </select>
                </div>
              </div>

              {/* ============================================================ */}
              {/* ============ SECTION CARROUSEL D'IMAGES ==================== */}
              {/* ============================================================ */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h3 className="text-md font-semibold text-gray-700 mb-3">🖼️ Images du projet (carrousel)</h3>

                {/* Carrousel */}
                {formImages.length > 0 ? (
                  <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-3" style={{ height: '250px' }}>
                    <img
                      src={formImages[currentImageIndex].url}
                      alt={formImages[currentImageIndex].titre || `Image ${currentImageIndex + 1}`}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" fill="%23f3f4f6"/%3E%3Ctext x="50" y="50" font-family="Arial" font-size="12" fill="%239ca3af" text-anchor="middle" dy=".3em"%3ENo image%3C/text%3E%3C/svg%3E';
                      }}
                    />
                    
                    {formImages.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={prevImage}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white w-10 h-10 rounded-full hover:bg-black/70 transition flex items-center justify-center"
                        >
                          ◀
                        </button>
                        <button
                          type="button"
                          onClick={nextImage}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white w-10 h-10 rounded-full hover:bg-black/70 transition flex items-center justify-center"
                        >
                          ▶
                        </button>
                      </>
                    )}

                    {formImages.length > 1 && (
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-3 py-1 rounded-full">
                        {currentImageIndex + 1} / {formImages.length}
                      </div>
                    )}

                    {formImages[currentImageIndex].titre && (
                      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-black/60 text-white text-sm px-4 py-1 rounded">
                        {formImages[currentImageIndex].titre}
                      </div>
                    )}

                    {/* Badge fichier local */}
                    {formImages[currentImageIndex].file && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                        📁 Fichier local
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-gray-100 rounded-lg h-32 flex items-center justify-center text-gray-400 mb-3">
                    Aucune image ajoutée
                  </div>
                )}

                {/* Miniatures */}
                {formImages.length > 1 && (
                  <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
                    {formImages.map((img, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-16 h-16 rounded border-2 overflow-hidden flex-shrink-0 relative ${
                          index === currentImageIndex ? 'border-blue-500' : 'border-gray-300'
                        }`}
                      >
                        <img
                          src={img.url}
                          alt={img.titre || `Miniature ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" fill="%23f3f4f6"/%3E%3Ctext x="50" y="50" font-family="Arial" font-size="12" fill="%239ca3af" text-anchor="middle" dy=".3em"%3ENo image%3C/text%3E%3C/svg%3E';
                          }}
                        />
                        {img.file && (
                          <div className="absolute top-0 right-0 bg-green-500 text-white text-xs px-1 rounded-bl">
                            📁
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}

                {/* === AJOUT D'IMAGE : URL ou FICHIER === */}
                <div className="border border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
                  <p className="text-sm text-gray-600 mb-3">
                    Ajoutez une image par <strong>URL</strong> ou depuis votre <strong>ordinateur</strong> :
                  </p>

                  {/* Option 1: URL */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <input
                      type="text"
                      placeholder="URL de l'image (ex: https://...)"
                      className="flex-1 min-w-[200px] p-2 border border-gray-300 rounded text-sm bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      disabled={!!newImageFile}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <div className="text-sm text-gray-500 font-medium">OU</div>

                    {/* Option 2: Upload depuis le PC */}
                    <div className="flex-1 w-full">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        📁 Télécharger depuis votre ordinateur
                      </label>
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                      />
                      {newImageFile && (
                        <p className="text-xs text-green-600 mt-1">
                          ✅ Fichier sélectionné : {newImageFile.name} ({(newImageFile.size / 1024).toFixed(1)} KB)
                        </p>
                      )}
                    </div>

                    {/* Titre */}
                    <div className="w-full sm:w-40">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                      <input
                        type="text"
                        placeholder="Titre (optionnel)"
                        className="w-full p-2 border border-gray-300 rounded text-sm bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={newImageTitre}
                        onChange={(e) => setNewImageTitre(e.target.value)}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleAddFormImage}
                      className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition whitespace-nowrap mt-2 sm:mt-0"
                    >
                      + Ajouter l'image
                    </button>
                  </div>

                  {/* Annuler la sélection du fichier */}
                  {newImageFile && (
                    <button
                      type="button"
                      onClick={() => {
                        setNewImageFile(null);
                        setNewImageUrl('');
                        if (fileInputRef.current) fileInputRef.current.value = '';
                      }}
                      className="text-xs text-red-500 hover:text-red-700 mt-2"
                    >
                      ✕ Annuler la sélection
                    </button>
                  )}
                </div>

                {/* Liste des images ajoutées avec bouton supprimer */}
                {formImages.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formImages.map((img, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm flex items-center gap-1"
                      >
                        {img.file ? '📁 ' : '🔗 '}
                        {img.titre || `Image ${index + 1}`}
                        <button
                          type="button"
                          onClick={() => handleRemoveFormImage(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Boutons de validation */}
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setFormImages([]);
                    setNewImageFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition text-gray-700"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {uploading 
                    ? '📤 Upload en cours...' 
                    : isSubmitting 
                      ? 'Création...' 
                      : `Créer le projet (${formImages.length} image${formImages.length > 1 ? 's' : ''})`
                  }
                </button>
              </div>
            </form>
          )}

          {/* ==================== TABLEAU DES PROJETS ==================== */}
          {loading ? (
            <p className="text-gray-500">Chargement...</p>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              ❌ {error}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left text-gray-700">Nom</th>
                    <th className="p-3 text-left text-gray-700">Objectif</th>
                    <th className="p-3 text-left text-gray-700">Statut</th>
                    <th className="p-3 text-left text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projets.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="p-6 text-center text-gray-500">
                        Aucun projet. Créez le premier !
                      </td>
                    </tr>
                  ) : (
                    projets.map((projet) => (
                      <tr key={projet.idProjet} className="border-t">
                        <td className="p-3">
                          <button
                            onClick={() => setSelectedProjetId(projet.idProjet)}
                            className="text-blue-600 hover:text-blue-800 font-medium"
                          >
                            {projet.nom}
                          </button>
                        </td>
                        <td className="p-3 text-gray-700">{projet.objectif} €</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded text-sm ${
                            projet.statut === 'en_cours' ? 'bg-blue-100 text-blue-700' :
                            projet.statut === 'termine' ? 'bg-green-100 text-green-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {projet.statut}
                          </span>
                        </td>
                        <td className="p-3">
                          <button 
                            onClick={() => handleDelete(projet.idProjet)} 
                            className="text-red-600 hover:text-red-800"
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* ================================================================ */}
          {/* ==================== MODAL DETAILS ============================== */}
          {/* ================================================================ */}
          {selectedProjetId !== null && selectedProjet && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{selectedProjet.nom}</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {selectedProjet.description || 'Aucune description'}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedProjetId(null)}
                    className="text-gray-400 hover:text-gray-600 text-xl"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm mb-4 text-gray-700">
                  <div><strong>Objectif :</strong> {selectedProjet.objectif} €</div>
                  <div><strong>Début :</strong> {formatDate(selectedProjet.date_debut)}</div>
                  <div><strong>Fin :</strong> {formatDate(selectedProjet.date_fin)}</div>
                </div>

                {/* ---- SECTION BESOINS ---- */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">📦 Besoins en nature</h4>
                  
                  <div className="flex flex-wrap gap-2 mb-2">
                    {besoins[selectedProjetId]?.map((b) => (
                      <span key={b.idBesoin} className="bg-green-50 text-green-700 px-2 py-1 rounded text-sm flex items-center gap-1">
                        {b.description} ({b.quantite} {b.unite})
                        <button
                          onClick={() => handleDeleteBesoin(b.idBesoin)}
                          className="text-red-500 hover:text-red-700 text-xs"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                    {(!besoins[selectedProjetId] || besoins[selectedProjetId].length === 0) && (
                      <span className="text-gray-400 text-sm">Aucun besoin</span>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <input
                      type="text"
                      placeholder="Description"
                      className="p-1 border rounded text-sm w-36 bg-white text-gray-900"
                      value={newBesoin[selectedProjetId]?.description || ''}
                      onChange={(e) =>
                        setNewBesoin((prev) => ({
                          ...prev,
                          [selectedProjetId]: {
                            ...prev[selectedProjetId],
                            description: e.target.value,
                            quantite: prev[selectedProjetId]?.quantite || '',
                            unite: prev[selectedProjetId]?.unite || '',
                            valeur_estimee: prev[selectedProjetId]?.valeur_estimee || '',
                          },
                        }))
                      }
                    />
                    <input
                      type="number"
                      placeholder="Qté"
                      className="p-1 border rounded text-sm w-16 bg-white text-gray-900"
                      value={newBesoin[selectedProjetId]?.quantite || ''}
                      onChange={(e) =>
                        setNewBesoin((prev) => ({
                          ...prev,
                          [selectedProjetId]: { 
                            ...prev[selectedProjetId], 
                            quantite: e.target.value 
                          },
                        }))
                      }
                    />
                    <input
                      type="text"
                      placeholder="Unité"
                      className="p-1 border rounded text-sm w-20 bg-white text-gray-900"
                      value={newBesoin[selectedProjetId]?.unite || ''}
                      onChange={(e) =>
                        setNewBesoin((prev) => ({
                          ...prev,
                          [selectedProjetId]: { 
                            ...prev[selectedProjetId], 
                            unite: e.target.value 
                          },
                        }))
                      }
                    />
                    <input
                      type="number"
                      placeholder="Valeur (€)"
                      className="p-1 border rounded text-sm w-20 bg-white text-gray-900"
                      value={newBesoin[selectedProjetId]?.valeur_estimee || ''}
                      onChange={(e) =>
                        setNewBesoin((prev) => ({
                          ...prev,
                          [selectedProjetId]: { 
                            ...prev[selectedProjetId], 
                            valeur_estimee: e.target.value 
                          },
                        }))
                      }
                    />
                    <button
                      onClick={() => handleAddBesoin(selectedProjetId)}
                      className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* ---- SECTION IMAGES ---- */}
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">🖼️ Images du carrousel</h4>
                  
                  <div className="flex flex-wrap gap-2 mb-2">
                    {images[selectedProjetId]?.map((img) => (
                      <div key={img.idImage} className="relative w-20 h-20 border rounded overflow-hidden group">
                        <img
                          src={img.url}
                          alt={img.titre || 'Image'}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" fill="%23f3f4f6"/%3E%3Ctext x="50" y="50" font-family="Arial" font-size="12" fill="%239ca3af" text-anchor="middle" dy=".3em"%3ENo image%3C/text%3E%3C/svg%3E';
                          }}
                        />
                        <button
                          onClick={() => handleDeleteImage(img.idImage)}
                          className="absolute top-0 right-0 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                        >
                          ✕
                        </button>
                        {img.titre && (
                          <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 truncate">
                            {img.titre}
                          </div>
                        )}
                      </div>
                    ))}
                    {(!images[selectedProjetId] || images[selectedProjetId].length === 0) && (
                      <span className="text-gray-400 text-sm">Aucune image</span>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <input
                      type="text"
                      placeholder="URL de l'image"
                      className="flex-1 min-w-[200px] p-2 border border-gray-300 rounded text-sm bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={newImage[selectedProjetId]?.url || ''}
                      onChange={(e) =>
                        setNewImage((prev) => ({
                          ...prev,
                          [selectedProjetId]: {
                            ...prev[selectedProjetId],
                            url: e.target.value,
                          },
                        }))
                      }
                    />
                    <input
                      type="text"
                      placeholder="Titre (optionnel)"
                      className="w-32 p-2 border border-gray-300 rounded text-sm bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={newImage[selectedProjetId]?.titre || ''}
                      onChange={(e) =>
                        setNewImage((prev) => ({
                          ...prev,
                          [selectedProjetId]: {
                            ...prev[selectedProjetId],
                            titre: e.target.value,
                          },
                        }))
                      }
                    />
                    <button
                      onClick={() => handleAddImage(selectedProjetId)}
                      className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition"
                    >
                      + Ajouter
                    </button>
                  </div>
                </div>

                <div className="flex justify-end mt-6 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => setSelectedProjetId(null)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Layout>
    </ProtectedRoute>
  );
}