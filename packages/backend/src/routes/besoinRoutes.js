const express = require('express');
const router = express.Router();
const besoinController = require('../controllers/besoinController');
const { authenticate, isAdmin } = require('../middlewares/auth');

// === ROUTES PUBLIQUES ===
router.get('/', besoinController.getAll);
router.get('/projet/:idProjet', besoinController.getByProjet);
router.get('/:id', besoinController.getById);

// === ROUTES PROTÉGÉES (admin uniquement) ===
router.post('/projet/:idProjet', authenticate, isAdmin, besoinController.create);
router.put('/:id', authenticate, isAdmin, besoinController.update);
router.delete('/:id', authenticate, isAdmin, besoinController.delete);

module.exports = router;