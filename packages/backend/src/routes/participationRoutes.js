const express = require('express');
const router = express.Router();
const participationController = require('../controllers/participationController');
const { authenticate, isAdmin } = require('../middlewares/auth');

// === ROUTES PUBLIQUES ===
router.get('/', participationController.getAll);
router.get('/benevole/:idBenevole', participationController.getByBenevole);

// === ROUTES PROTÉGÉES (admin uniquement) ===
router.post('/', authenticate, isAdmin, participationController.create);
router.delete('/:id', authenticate, isAdmin, participationController.delete);

module.exports = router;