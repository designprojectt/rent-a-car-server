const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ error: { message: 'Unauthorized' } });
  }
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length).trimLeft();
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({ error: { message: 'Invalid token' } });
  }
};
