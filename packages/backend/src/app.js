const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Importer toutes les routes
const projetRoutes = require('./routes/projetRoutes');
const besoinRoutes = require('./routes/besoinRoutes');
const donateurRoutes = require('./routes/donateurRoutes');
const donRoutes = require('./routes/donRoutes');
const benevoleRoutes = require('./routes/benevoleRoutes');
const participationRoutes = require('./routes/participationRoutes');
const administrateurRoutes = require('./routes/administrateurRoutes');
const imageRoutes = require('./routes/imageRoutes');

const { syncDatabase } = require('./models');

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Synchroniser la base de données
syncDatabase();

// Routes publiques + protégées
// ✅ Servir les fichiers statiques du dossier uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/projets', projetRoutes);
app.use('/api/besoins', besoinRoutes);
app.use('/api/donateurs', donateurRoutes);
app.use('/api/dons', donRoutes);
app.use('/api/benevoles', benevoleRoutes);
app.use('/api/participations', participationRoutes);
app.use('/api/admin', administrateurRoutes);
app.use('/api/images', imageRoutes);

// Route de santé
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'API de l\'association' });
});

module.exports = app;