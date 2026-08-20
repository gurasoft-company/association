const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');
const { authenticate, isAdmin } = require('../middlewares/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configuration de multer pour l'upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'projet-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Seules les images sont autorisées'), false);
    }
  }
});

// Routes publiques
router.get('/projet/:idProjet', imageController.getByProjet);

// Routes protégées
router.post('/', authenticate, isAdmin, imageController.create);
router.post('/upload', authenticate, isAdmin, upload.single('image'), imageController.upload); // ✅ NOUVELLE ROUTE
router.delete('/:id', authenticate, isAdmin, imageController.delete);

module.exports = router;