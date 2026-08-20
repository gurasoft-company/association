const express = require('express');
const router = express.Router();
const projetController = require('../controllers/projetController');
const { authenticate, isAdmin } = require('../middlewares/auth');

// Routes publiques
router.get('/', projetController.getAll);
router.get('/:id', projetController.getById);

// Routes protégées (admin uniquement)
router.post('/', authenticate, isAdmin, projetController.create);
router.put('/:id', authenticate, isAdmin, projetController.update);
router.delete('/:id', authenticate, isAdmin, projetController.delete);

module.exports = router;