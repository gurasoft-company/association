const express = require('express');
const router = express.Router();
const donController = require('../controllers/donController');
const { authenticate, isAdmin } = require('../middlewares/auth');

// === ROUTES PUBLIQUES ===
router.get('/', donController.getAll);
router.get('/:id', donController.getById);

// === ROUTES PROTÉGÉES (admin uniquement) ===
router.post('/', authenticate, isAdmin, donController.create);
router.delete('/:id', authenticate, isAdmin, donController.delete);

module.exports = router;