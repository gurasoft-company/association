const { Don, Donateur, Projet, Besoin } = require('../models');

const donController = {
    // Récupérer tous les dons
    getAll: async (req, res) => {
        try {
            const dons = await Don.findAll({
                include: [
                    { model: Donateur },
                    { model: Projet },
                    { model: Besoin }
                ]
            });
            res.json(dons);
        } catch (error) {
            res.status(500).json({ erreur: error.message });
        }
    },

    // Récupérer un don par son id
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const don = await Don.findByPk(id, {
                include: [
                    { model: Donateur },
                    { model: Projet },
                    { model: Besoin }
                ]
            });
            if (!don) {
                return res.status(404).json({ message: 'Don non trouvé' });
            }
            res.json(don);
        } catch (error) {
            res.status(500).json({ erreur: error.message });
        }
    },

    // Créer un don
    create: async (req, res) => {
        try {
            const don = await Don.create(req.body);
            res.status(201).json(don);
        } catch (error) {
            res.status(500).json({ erreur: error.message });
        }
    },

    // Supprimer un don
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const don = await Don.findByPk(id);
            if (!don) {
                return res.status(404).json({ message: 'Don non trouvé' });
            }
            await don.destroy();
            res.json({ message: 'Don supprimé' });
        } catch (error) {
            res.status(500).json({ erreur: error.message });
        }
    }
};

module.exports = donController;