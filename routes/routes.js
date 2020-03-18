const router = require('express').Router();
// const passport = require('passport');

const authRouter = require('./auth.router');
const adsRouter = require('./ads.router');
const userRouter = require('./user.router');
const categoriesRouter = require('./categories.router');

const { getAllAds, getAdsById } = require('../controllers/ads');

// const passportCheck = passport.authenticate('jwt', {
// 	session: false
// });

router
	.use('/auth', authRouter)
	// .get('/ads/all', getAllAds)
	.use('/ads', adsRouter)
	// .get('/ads/:adsId', getAdsById)
	.use('/user', userRouter)
	.use('/categories', categoriesRouter)
	// .get('/ads/all', getAllAds)
	.use((req, res) => {
		res.status(404).json({
			status: 'error',
			message: 'No such route'
		});
	});

module.exports = router;
