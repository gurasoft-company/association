const { Administrateur } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const administrateurController = {
    // === INSCRIPTION ===
    register: async (req, res) => {
        try {
            const { mot_de_passe, ...autres } = req.body;
            const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
            const admin = await Administrateur.create({
                ...autres,
                mot_de_passe: hashedPassword
            });
            res.status(201).json({ message: 'Admin créé avec succès', admin });
        } catch (error) {
            res.status(500).json({ erreur: error.message });
        }
    },

    // === CONNEXION ===
    login: async (req, res) => {
        try {
            const { email, mot_de_passe } = req.body;

            // 1. Vérifier si l'admin existe
            const admin = await Administrateur.findOne({ where: { email } });
            if (!admin) {
                return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
            }

            // 2. Vérifier le mot de passe
            const isValid = await bcrypt.compare(mot_de_passe, admin.mot_de_passe);
            if (!isValid) {
                return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
            }

            // 3. Générer un token JWT
            const token = jwt.sign(
                { idAdmin: admin.idAdmin, email: admin.email, role: 'admin' },
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
            );

            // 4. Répondre avec le token et les infos admin (sans le mot de passe)
            res.json({
                token,
                admin: {
                    idAdmin: admin.idAdmin,
                    nom: admin.nom,
                    prenom: admin.prenom,
                    email: admin.email
                }
            });

        } catch (error) {
            res.status(500).json({ erreur: error.message });
        }
    },

    // === RÉCUPÉRER LES INFOS DE L'ADMIN CONNECTÉ ===
    me: async (req, res) => {
        try {
            const admin = await Administrateur.findByPk(req.user.idAdmin);
            if (!admin) {
                return res.status(404).json({ message: 'Admin non trouvé' });
            }
            res.json({
                idAdmin: admin.idAdmin,
                nom: admin.nom,
                prenom: admin.prenom,
                email: admin.email
            });
        } catch (error) {
            res.status(500).json({ erreur: error.message });
        }
    },

    // === LIRE TOUS LES ADMINS ===
    getAll: async (req, res) => {
        try {
            const admins = await Administrateur.findAll();
            res.json(admins);
        } catch (error) {
            res.status(500).json({ erreur: error.message });
        }
    },

    // === LIRE UN ADMIN ===
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const admin = await Administrateur.findByPk(id);
            if (!admin) {
                return res.status(404).json({ message: 'Admin non trouvé' });
            }
            res.json(admin);
        } catch (error) {
            res.status(500).json({ erreur: error.message });
        }
    },

    // === METTRE À JOUR UN ADMIN ===
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const admin = await Administrateur.findByPk(id);
            if (!admin) {
                return res.status(404).json({ message: 'Admin non trouvé' });
            }
            await admin.update(req.body);
            res.json(admin);
        } catch (error) {
            res.status(500).json({ erreur: error.message });
        }
    },

    // === SUPPRIMER UN ADMIN ===
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const admin = await Administrateur.findByPk(id);
            if (!admin) {
                return res.status(404).json({ message: 'Admin non trouvé' });
            }
            await admin.destroy();
            res.json({ message: 'Admin supprimé' });
        } catch (error) {
            res.status(500).json({ erreur: error.message });
        }
    }
};

module.exports = administrateurController;