const Router = require('express');
const User = require('../models/User.js');

const router = new Router();

router.get(
    '/',
    async (req, res) => {
      try {
        const users = await User.find();
        res.json(users);
      } catch (error) {
        res.json({
          status: 200,
          message: 'что-то пошло не так',
        });
      }
    },
);

router.delete(
    '/delete/:email',
    async (req, res) => {
      try {
        const userEmail = req.params.email;
        console.log(userEmail);
        await User.deleteOne({email: userEmail});

        res.json({
          message: 'Пользователь удалён',
        });
      } catch (error) {
        res.sendStatus(500).json({
          message: 'что-то пошло не так',
        });
      }
    },
);

module.exports = router;