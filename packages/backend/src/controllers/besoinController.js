const { Besoin, Projet } = require('../models');

const besoinController = {
    // Récupérer tous les besoins
    getAll: async (req, res) => {
        try {
            const besoins = await Besoin.findAll({
                include: [{ model: Projet }]
            });
            res.json(besoins);
        } catch (error) {
            res.status(500).json({ erreur: error.message });
        }
    },

    // Récupérer les besoins d'un projet spécifique
    getByProjet: async (req, res) => {
        try {
            const { idProjet } = req.params;
            const besoins = await Besoin.findAll({
                where: { idProjet },
                include: [{ model: Projet }]
            });
            res.json(besoins);
        } catch (error) {
            res.status(500).json({ erreur: error.message });
        }
    },

    // Récupérer un besoin par son id
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const besoin = await Besoin.findByPk(id, {
                include: [{ model: Projet }]
            });
            if (!besoin) {
                return res.status(404).json({ message: 'Besoin non trouvé' });
            }
            res.json(besoin);
        } catch (error) {
            res.status(500).json({ erreur: error.message });
        }
    },

    // Créer un besoin pour un projet
    create: async (req, res) => {
        try {
            const { idProjet } = req.params;
            const projet = await Projet.findByPk(idProjet);
            if (!projet) {
                return res.status(404).json({ message: 'Projet non trouvé' });
            }
            const besoin = await Besoin.create({
                ...req.body,
                idProjet
            });
            res.status(201).json(besoin);
        } catch (error) {
            res.status(500).json({ erreur: error.message });
        }
    },

    // Mettre à jour un besoin
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const besoin = await Besoin.findByPk(id);
            if (!besoin) {
                return res.status(404).json({ message: 'Besoin non trouvé' });
            }
            await besoin.update(req.body);
            res.json(besoin);
        } catch (error) {
            res.status(500).json({ erreur: error.message });
        }
    },

    // Supprimer un besoin
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const besoin = await Besoin.findByPk(id);
            if (!besoin) {
                return res.status(404).json({ message: 'Besoin non trouvé' });
            }
            await besoin.destroy();
            res.json({ message: 'Besoin supprimé' });
        } catch (error) {
            res.status(500).json({ erreur: error.message });
        }
    }
};

module.exports = besoinController;