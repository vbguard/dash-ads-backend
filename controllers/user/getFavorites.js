const User = require('../../models/user.model');
const { ValidationError } = require('../../core/error');

const addFavorite = (req, res) => {
	const userId = req.user._id;

	const sendResponse = user => {
		res.json({
			status: 'success',
			user
		});
	};

	User.findOne({
		_id: userId
	})
		.populate({
			path: 'favorites',
			select: {
				__v: 0,
				userId: 0,
				updatedAt: 0
			}
		})
		.then(user => {
			sendResponse({ favorites: user.favorites });
		})
		.catch(err => {
			throw new ValidationError(err.message);
		});
};

module.exports = addFavorite;
