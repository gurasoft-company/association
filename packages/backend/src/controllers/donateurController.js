const { Donateur } = require('../models');

const donateurController = {
    // Récupérer tous les donateurs
    getAll: async (req, res) => {
        try {
            const donateurs = await Donateur.findAll();
            res.json(donateurs);
        } catch (error) {
            res.status(500).json({ erreur: error.message });
        }
    },

    // Récupérer un donateur par son id
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const donateur = await Donateur.findByPk(id);
            if (!donateur) {
                return res.status(404).json({ message: 'Donateur non trouvé' });
            }
            res.json(donateur);
        } catch (error) {
            res.status(500).json({ erreur: error.message });
        }
    },

    // Créer un donateur
    create: async (req, res) => {
        try {
            const donateur = await Donateur.create(req.body);
            res.status(201).json(donateur);
        } catch (error) {
            res.status(500).json({ erreur: error.message });
        }
    },

    // Mettre à jour un donateur
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const donateur = await Donateur.findByPk(id);
            if (!donateur) {
                return res.status(404).json({ message: 'Donateur non trouvé' });
            }
            await donateur.update(req.body);
            res.json(donateur);
        } catch (error) {
            res.status(500).json({ erreur: error.message });
        }
    },

    // Supprimer un donateur
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const donateur = await Donateur.findByPk(id);
            if (!donateur) {
                return res.status(404).json({ message: 'Donateur non trouvé' });
            }
            await donateur.destroy();
            res.json({ message: 'Donateur supprimé' });
        } catch (error) {
            res.status(500).json({ erreur: error.message });
        }
    }
};

module.exports = donateurController;