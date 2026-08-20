export const formatDate = (dateString: string): string => {
  if (!dateString) return 'Non défini';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Non défini';
  const jour = String(date.getDate()).padStart(2, '0');
  const mois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'][date.getMonth()];
  return `${jour}-${mois}-${date.getFullYear()}`;
};