const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  //Get token from header
  const token = req.header('X-auth-token');

  //Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  //verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.vender = decoded.vender;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
