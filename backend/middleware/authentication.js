const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  if(!token) {
    return res.status(401).send({ message: 'Unauthorized '});
  }

  try {
    jwt.verify(token, 'green field project', (err, user) => {
      console.log('Error:', err, 'User:', user);
      if(err) {
        return res.status(403).send({ message: 'Unauthorized access different token'});// if the token has expired or invalid
      }
      req.user = user;
      next();
    })
  } catch (error) {
    res.status(401).send({ message: 'Token is not valid' });
  }
}

module.exports = authenticateToken;