const app = require('./src/app');

const PORT = process.env.PORT || 5000;

// ✅ Écouter sur toutes les interfaces (0.0.0.0)
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Serveur backend démarré sur http://0.0.0.0:${PORT}`);
});