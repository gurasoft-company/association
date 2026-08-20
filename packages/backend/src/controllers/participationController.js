const { Participation, Benevole, Projet } = require('../models');

const participationController = {
    getAll: async (req, res) => {
        try {
            const participations = await Participation.findAll({
                include: [
                    { model: Benevole },
                    { model: Projet }
                ]
            });
            res.json(participations);
        } catch (error) {
            res.status(500).json({ erreur: error.message });
        }
    },

    getByBenevole: async (req, res) => {
        try {
            const { idBenevole } = req.params;
            const participations = await Participation.findAll({
                where: { idBenevole },
                include: [{ model: Projet }]
            });
            res.json(participations);
        } catch (error) {
            res.status(500).json({ erreur: error.message });
        }
    },

    create: async (req, res) => {
        try {
            const participation = await Participation.create(req.body);
            res.status(201).json(participation);
        } catch (error) {
            res.status(500).json({ erreur: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const participation = await Participation.findByPk(id);
            if (!participation) {
                return res.status(404).json({ message: 'Participation non trouvée' });
            }
            await participation.destroy();
            res.json({ message: 'Participation supprimée' });
        } catch (error) {
            res.status(500).json({ erreur: error.message });
        }
    }
};

module.exports = participationController;