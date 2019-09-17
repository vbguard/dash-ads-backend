const router = require('express').Router();
const passport = require('passport');

const authRouter = require('./auth.router');
const adsRouter = require('./ads.router');
const userRouter = require('./user.router');
const { getAllAds } = require('../controllers/ads');

const passportCheck = passport.authenticate('jwt', {
	session: false
});

router
	.use('/auth', authRouter)
	.use('/ads', passportCheck, adsRouter)
	.use('/user', userRouter)
	.get('/ads/all', getAllAds);

module.exports = router;
