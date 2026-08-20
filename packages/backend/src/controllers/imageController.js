const { Image } = require('../models');

const imageController = {
    getByProjet: async (req, res) => {
        try {
            const { idProjet } = req.params;
            const images = await Image.findAll({ where: { idProjet } });
            res.json(images);
        } catch (error) {
            res.status(500).json({ erreur: error.message });
        }
    },

    create: async (req, res) => {
        try {
            const image = await Image.create(req.body);
            res.status(201).json(image);
        } catch (error) {
            res.status(500).json({ erreur: error.message });
        }
    },

    // ✅ NOUVEAU : Upload d'image depuis un fichier
    upload: async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ message: 'Aucune image téléchargée' });
            }

            const { titre, idProjet } = req.body;
            
            // Construction de l'URL accessible
            const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
            const imageUrl = `${baseUrl}/uploads/${req.file.filename}`;

            const image = await Image.create({
                url: imageUrl,
                titre: titre || req.file.originalname,
                idProjet: parseInt(idProjet)
            });

            res.status(201).json(image);
        } catch (error) {
            res.status(500).json({ erreur: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const image = await Image.findByPk(id);
            if (!image) {
                return res.status(404).json({ message: 'Image non trouvée' });
            }
            await image.destroy();
            res.json({ message: 'Image supprimée' });
        } catch (error) {
            res.status(500).json({ erreur: error.message });
        }
    }
};

module.exports = imageController;