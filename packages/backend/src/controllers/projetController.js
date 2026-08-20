const { Projet } = require('../models');

const projetController = {
    // Récupérer tous les projets
    getAll: async (req, res) => {
        try {
            const projets = await Projet.findAll();
            res.json(projets);
        } catch (error) {
            res.status(500).json({ erreur: error.message });
        }
    },

    // Récupérer un projet par son id
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const projet = await Projet.findByPk(id);
            if (!projet) {
                return res.status(404).json({ message: 'Projet non trouvé' });
            }
            res.json(projet);
        } catch (error) {
            res.status(500).json({ erreur: error.message });
        }
    },

    // Créer un projet
    create: async (req, res) => {
        try {
            const projet = await Projet.create(req.body);
            res.status(201).json(projet);
        } catch (error) {
            res.status(500).json({ erreur: error.message });
        }
    },

    // Mettre à jour un projet
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const projet = await Projet.findByPk(id);
            if (!projet) {
                return res.status(404).json({ message: 'Projet non trouvé' });
            }
            await projet.update(req.body);
            res.json(projet);
        } catch (error) {
            res.status(500).json({ erreur: error.message });
        }
    },

    // Supprimer un projet
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const projet = await Projet.findByPk(id);
            if (!projet) {
                return res.status(404).json({ message: 'Projet non trouvé' });
            }
            await projet.destroy();
            res.json({ message: 'Projet supprimé' });
        } catch (error) {
            res.status(500).json({ erreur: error.message });
        }
    }
};

module.exports = projetController;