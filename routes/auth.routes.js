const Router = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const {
  check,
  validationResult,
} = require('express-validator');

const router = new Router();

router.post(
    '/register',
    [
      check('email', 'Некорректный email').isEmail(),
      check('password', 'Некорректный пароль').isLength({
        min: 6,
        max: 24,
      }),
      check('name', 'Некорректное имя').isLength({
        min: 2,
      }),
    ],
    async (req, res) => {
      try {
        console.log('Body on server: ', req.body);

        const errors = validationResult(req);

        if (!errors.isEmpty) {
          return res.status(400).json({
            errors: errors.array(),
            message: 'Некорректные данные при регистрации',
          });
        }

        const {
          name,
          email,
          password,
          isAdmin,
        } = req.body;

        const candidate = await User.findOne({
          email,
        });

        if (candidate) {
          return res.status(400).json({
            message: 'Такой пользователь уже существует',
          });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
          name,
          email,
          password: hashedPassword,
          isAdmin,
        });

        await newUser.save();

        res.json({
          message: 'User registered',
          userName: newUser.name,
          userMail: newUser.email,
          isUserAdmin: newUser.isAdmin,
        });
      } catch (error) {
        res.sendStatus(500).json({
          message: 'что-то пошло не так ',
        });
      }
    });

// /api/auth/login
router.post(
    '/login',
    [
      check('email', 'Введите корректный email').isEmail(),
      check('password', 'Введите пароль').exists(),
      check('password', 'Введите корректный пароль').isLength({
        min: 6,
        max: 24,
      }),
    ],
    async (req, res) => {
      try {
        console.log('Body on server: ', req.body);
        const errors = validationResult(req);

        if (!errors.isEmpty) {
          return res.status(400).json({
            errors: errors.array(),
            message: 'Некорректные данные при входе в систему',
          });
        }

        const {
          email,
          password,
        } = req.body;

        const user = await User.findOne({
          email,
        });

        if (!user) {
          return res.status(400).json({
            message: 'Неверный логин или пароль. Попробуйте снова',
          });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return res.status(400).json({
            message: 'Неверный логин или пароль. Попробуйте снова',
          });
        }

        const token = jwt.sign({
          userId: user.id, // Сюда также можно передать email и пароль
        },
        config.get('jwtSecret'), {
          expiresIn: '1h',
        },
        );

        res.json({
          token,
          userId: user.id,
          userName: user.name,
          userMail: user.email,
          isUserAdmin: user.isAdmin,
        });
      } catch (error) {
        res.sendStatus(500).json({
          message: 'что-то пошло не так',
        });
      }
    });

router.get(
    '/users',
    async (req, res) => {
      try {
        const users = await User.find();
        res.json(users);
      } catch (error) {
        res.sendStatus(500).json({
          message: 'что-то пошло не так',
        });
      }
    },
);

router.delete(
    '/users/delete/:email',
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

