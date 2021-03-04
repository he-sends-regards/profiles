const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../const');

module.exports = (req, res, next) => {
  // Проверка на системные запросы
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.usertoken;

    if (!token) {
      return res.status(401).json(
          {message: 'Вы не авторизованы. Eсли это не так, перезайдите...'},
      );
    }

    req.user = jwt.verify(token, jwtSecret);
    next();
  } catch (e) {
    res.status(401).json(
        {message: 'Вы не авторизованы. Eсли это не так, перезайдите...'},
    );
  }
};
