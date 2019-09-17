const router = require('express').Router();
const passport = require('passport');

const authRouter = require('./auth.router');
const adsRouter = require('./ads.router');
const userRouter = require('./user.router');
const categoriesRouter = require('./categories.router');

const { getAllAds } = require('../controllers/ads');

const passportCheck = passport.authenticate('jwt', {
	session: false
});

router
	.use('/auth', authRouter)
	.use('/ads', passportCheck, adsRouter)
	.use('/user', userRouter)
	.use('/categories', categoriesRouter)
	.get('/ads/all', getAllAds)
	.all('*', (req, res) => {
		res.status(400).json({
			status: 'error',
			message: 'No such route'
		});
	});

module.exports = router;
