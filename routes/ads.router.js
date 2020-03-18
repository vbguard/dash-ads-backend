const router = require('express').Router();
const passport = require('passport');

const { createAds, getAllUserAds, deleteAds, updateAds, getAdsById, getAllAds } = require('../controllers/ads');

const passportCheck = passport.authenticate('jwt', {
	session: false
});

router
	.get('/', getAllAds)
	.post('/', passportCheck, createAds)
	.get('/uid/:uid', getAllUserAds)
	.get('/:aid', getAdsById)
	.patch('/:aid', passportCheck, updateAds)
	.delete('/:aid', passportCheck, deleteAds);

module.exports = router;
