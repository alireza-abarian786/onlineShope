const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];

      console.log('protect middleware activated');

      console.log('TOKEN:', token);
      console.log('JWT_SECRET:', process.env.JWT_SECRET);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');

      return next();
    }

    throw new Error('No token provided');
  } catch (error) {
    console.error('AUTH ERROR:', error.message);
    res.status(401).json({ message: 'Not authorized' });
  }
};


const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as an admin' });
  }
};

module.exports = { protect, admin };
