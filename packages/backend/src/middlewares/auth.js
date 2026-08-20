const jwt = require('jsonwebtoken');

// Middleware : vérifier si l'utilisateur est authentifié
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Authentification requise' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // On attache les infos du token à req.user
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Token invalide ou expiré' });
    }
};

// Middleware : vérifier si l'utilisateur est admin
const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Accès réservé aux administrateurs' });
    }
    next();
};

module.exports = { authenticate, isAdmin };