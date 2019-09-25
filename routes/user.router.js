const router = require('express').Router();
const passport = require('passport');

const {
	restorePassword,
	getFavorites,
	updateUser,
	deleteUser,
	addFavorite,
	deleteFavorite
} = require('../controllers/user');

const passportCheck = passport.authenticate('jwt', {
	session: false
});

router
	.post('/:id')
	.get('/:id')
	.delete('/', passportCheck, deleteUser)
	.put('/', passportCheck, updateUser)
	.post('/restore', restorePassword)
	.put('/favorite/:adsId', passportCheck, addFavorite)
	.delete('/favorite/:adsId', passportCheck, deleteFavorite)
	.get('/favorites', passportCheck, getFavorites);

module.exports = router;
