const { Benevole } = require('../models');

const benevoleController = {
    getAll: async (req, res) => {
        try {
            const benevoles = await Benevole.findAll();
            res.json(benevoles);
        } catch (error) {
            res.status(500).json({ erreur: error.message });
        }
    },

    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const benevole = await Benevole.findByPk(id);
            if (!benevole) {
                return res.status(404).json({ message: 'Bénévole non trouvé' });
            }
            res.json(benevole);
        } catch (error) {
            res.status(500).json({ erreur: error.message });
        }
    },

    create: async (req, res) => {
        try {
            const benevole = await Benevole.create(req.body);
            res.status(201).json(benevole);
        } catch (error) {
            res.status(500).json({ erreur: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const benevole = await Benevole.findByPk(id);
            if (!benevole) {
                return res.status(404).json({ message: 'Bénévole non trouvé' });
            }
            await benevole.update(req.body);
            res.json(benevole);
        } catch (error) {
            res.status(500).json({ erreur: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const benevole = await Benevole.findByPk(id);
            if (!benevole) {
                return res.status(404).json({ message: 'Bénévole non trouvé' });
            }
            await benevole.destroy();
            res.json({ message: 'Bénévole supprimé' });
        } catch (error) {
            res.status(500).json({ erreur: error.message });
        }
    }
};

module.exports = benevoleController;