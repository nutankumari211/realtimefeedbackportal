const jwt = require('jsonwebtoken');
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Authentication failed' });
    }

    try {
        const decoded = jwt.verify(token, 'SECRET_KEY');
        req.userId = decoded.userId; 
        next();
    } catch (err) {
        res.status(401).json({ message: 'Authentication failed' });
    }
};

module.exports = authMiddleware;

