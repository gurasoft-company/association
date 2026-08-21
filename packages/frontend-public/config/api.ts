// Configuration centralisée de l'API
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL 
  || 'https://association-backend-ftnr.onrender.com';

export const getImageUrl = (url: string): string => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  // Si l'URL est relative, on la combine avec le base URL
  const cleanUrl = url.startsWith('/') ? url : `/${url}`;
  return `${API_BASE_URL}${cleanUrl}`;
};