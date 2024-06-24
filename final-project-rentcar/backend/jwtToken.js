const jwt = require('jsonwebtoken');
require('dotenv').config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'default_secret';

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    console.error('Authorization header missing');
    return res.status(401).json({ message: 'Authorization header required' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    console.error('Token missing');
    return res.status(401).json({ message: 'Token required' });
  }

  jwt.verify(token, accessTokenSecret, (err, decoded) => {
    if (err) {
      console.error('Token verification failed', err);
      return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }

    req.user = decoded;
    next();
  });
}

module.exports = {
  authenticateToken,
};