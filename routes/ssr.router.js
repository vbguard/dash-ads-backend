const router = require('express').Router();

const notFound = require('../controllers/ssr/notFound.controller');

router
	// .use('/auth', authRouter)
	// .use('/ads', passportCheck, adsRouter)
	// .use('/user', userRouter)
	.get('*', notFound);

module.exports = router;
