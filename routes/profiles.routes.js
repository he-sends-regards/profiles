const Router = require('express');
const Profile = require('../models/Profile');

const router = new Router();

router.get(
    '/',
    async (req, res) => {
      try {
        const profiles = await Profile.find();
        res.json(profiles);
      } catch (error) {
        res
            .send(500)
            .json({message: 'Профили не найдены'});
      }
    },
);

router.get(
    '/:userEmail',
    async (req, res) => {
      try {
        const userProfiles = await Profile.find({owner: req.params.userEmail});

        res.json(userProfiles);
      } catch (error) {
        res
            .send(500)
            .json({message: 'Профили не найдены'});
      }
    },
);

router.delete(
    '/delete/:id',
    async (req, res) => {
      try {
        const profileId = req.params.id;

        await Profile.deleteOne({_id: profileId});
        res.json({
          status: 200,
          message: 'Профиль удалён',
        });
      } catch (error) {
        res
            .send(500)
            .json({message: 'Профили не найдены'});
      }
    },
);

module.exports = router;
