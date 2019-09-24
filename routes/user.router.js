const router = require('express').Router();
const passport = require('passport');

const { restorePassword, updateUser, deleteUser, addFavorite, deleteFavorite } = require('../controllers/user');

const passportCheck = passport.authenticate('jwt', {
	session: false
});

router
	.post('/:id')
	.get('/:id')
	.delete('/', passportCheck, deleteUser)
	.put('/', passportCheck, updateUser)
	.post('/restore', restorePassword)
	.put('/:adsId', passportCheck, addFavorite)
	.delete('/:adsId', passportCheck, deleteFavorite);

module.exports = router;
