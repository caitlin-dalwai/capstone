const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
  let token = req.headers.authorization;

  if (token && token.startsWith('Bearer')) {
    token = token.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ message: 'Not authorized' });
      req.user = decoded;
      next();
    });
  } else {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};
