import axios from 'axios';

// ✅ Utiliser l'URL complète du backend Render
const API_URL = 'https://association-backend-ftnr.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;