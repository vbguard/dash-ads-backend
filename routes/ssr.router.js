const router = require('express').Router();

const notFound = require('../controllers/ssr/notFound.controller');

router
	// .use('/auth', authRouter)
	// .use('/ads', passportCheck, adsRouter)
	.get('/', (req, res) => {
		res.render('index');
	})
	.get('*', notFound);

module.exports = router;
