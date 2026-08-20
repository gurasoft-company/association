const express = require('express');
const router = express.Router();
const benevoleController = require('../controllers/benevoleController');
const { authenticate, isAdmin } = require('../middlewares/auth');

// === ROUTES PUBLIQUES ===
router.get('/', authenticate, isAdmin, benevoleController.getAll);
router.get('/:id', authenticate, isAdmin, benevoleController.getById);

// === ROUTES PROTÉGÉES (admin uniquement) ===
router.post('/', benevoleController.create);
router.put('/:id', authenticate, isAdmin, benevoleController.update);
router.delete('/:id', authenticate, isAdmin, benevoleController.delete);

module.exports = router;