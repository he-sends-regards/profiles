const Router = require('express');
// const auth = require('../middleware/auth.middleware');
const Profile = require('../models/Profile');

const router = new Router();

// /api/profiles/add
// router.post()

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

router.delete(
    '/delete/:id',
    async (req, res) => {
      try {
        const profileId = req.params.id;

        await Profile.deleteOne({_id: profileId});
        res.json({message: 'Профиль удалён'});
      } catch (error) {
        res
            .send(500)
            .json({message: 'Профили не найдены'});
      }
    },
);

module.exports = router;
