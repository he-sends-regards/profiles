const Router = require('express');
const User = require('../models/User.js');
const Profile = require('../models/Profile.js');

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
        const {isUserAdmin} = req.body;
        if (!isUserAdmin) {
          return res.status(401).json({
            message: 'Вы не админ',
          });
        }

        const userEmail = req.params.email;

        await Profile.deleteMany({owner: `${userEmail}`});
        await User.deleteOne({email: userEmail});

        res.json({
          status: 200,
          message: 'Пользователь удалён',
        });
      } catch (error) {
        res.sendStatus(500).json({
          message: 'что-то пошло не так',
        });
      }
    },
);

router.get(
    '/dashboard',
    async (req, res) => {
      try {
        const usersCount = (await User.find()).length;
        const profiles = await Profile.find();
        const profilesCount = profiles.length;

        res.json({
          usersCount,
          profilesCount,
          profiles,
        });
      } catch (error) {
        res.sendStatus(500).json({
          message: 'что-то пошло не так',
        });
      }
    },
);

router.put(
    '/updateToAdmin/:email',
    async (req, res) => {
      try {
        await User.updateOne(
            {email: req.params.email},
            {isAdmin: true},
        );

        res.json({
          status: 200,
          message: `Пользователь '${req.params.email}' повышен до админа`,
        });
      } catch (error) {
        res.sendStatus(500).json({
          message: 'что-то пошло не так',
        });
      }
    },
);

module.exports = router;
