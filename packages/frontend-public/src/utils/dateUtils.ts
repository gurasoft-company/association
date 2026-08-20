// src/utils/dateUtils.ts

export const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return 'Non défini';
  
  const date = new Date(dateString);
  
  // Vérifier si la date est valide
  if (isNaN(date.getTime())) return 'Non défini';
  
  const jour = String(date.getDate()).padStart(2, '0');
  
  const moisIndex = date.getMonth();
  const mois = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ][moisIndex];
  
  const annee = date.getFullYear();
  
  return `${jour}-${mois}-${annee}`;
};