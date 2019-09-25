const restorePassword = require('./restorePassword');
const updateUser = require('./updateUser');
const deleteUser = require('./deleteUser');
const addFavorite = require('./addFavorite');
const deleteFavorite = require('./deleteFavorite');
const getFavorites = require('./getFavorites');

module.exports = {
	restorePassword,
	updateUser,
	deleteUser,
	addFavorite,
	deleteFavorite,
	getFavorites
};
