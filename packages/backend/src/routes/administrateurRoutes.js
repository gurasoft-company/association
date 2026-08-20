const express = require('express');
const router = express.Router();
const administrateurController = require('../controllers/administrateurController');
const { authenticate, isAdmin } = require('../middlewares/auth');

// === ROUTES PUBLIQUES ===
router.post('/register', administrateurController.register);
router.post('/login', administrateurController.login);

// === ROUTES PROTÉGÉES (admin uniquement) ===
router.get('/me', authenticate, isAdmin, administrateurController.me);
router.get('/', authenticate, isAdmin, administrateurController.getAll);
router.get('/:id', authenticate, isAdmin, administrateurController.getById);
router.put('/:id', authenticate, isAdmin, administrateurController.update);
router.delete('/:id', authenticate, isAdmin, administrateurController.delete);

module.exports = router;