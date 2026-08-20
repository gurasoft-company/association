const express = require('express');
const router = express.Router();
const donateurController = require('../controllers/donateurController');
const { authenticate, isAdmin } = require('../middlewares/auth');

// === ROUTES PUBLIQUES ===
router.get('/', donateurController.getAll);
router.get('/:id', donateurController.getById);

// === ROUTES PROTÉGÉES (admin uniquement) ===
router.post('/', authenticate, isAdmin, donateurController.create);
router.put('/:id', authenticate, isAdmin, donateurController.update);
router.delete('/:id', authenticate, isAdmin, donateurController.delete);

module.exports = router;