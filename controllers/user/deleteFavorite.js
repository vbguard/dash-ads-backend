const User = require('../../models/user.model');
const Joi = require('joi');
const { ValidationError } = require('../../core/error');

const deleteFavorite = (req, res) => {
	const userId = req.user._id;
	const adsId = req.params.adsId;

	const sendResponse = user => {
		res.json({
			status: 'success',
			user
		});
	};

	User.findOneAndUpdate({ _id: userId }, { $pull: { favorite: adsId } }, { new: true })
		.then(user => {
			user
				.populate('favorite')
				.then(favorites => {
					sendResponse({ favorite: favorites.favorites });
				})
				.catch(err => {
					throw new ValidationError(err.message);
				});
		})
		.catch(err => {
			throw new ValidationError(err.message);
		});
};

module.exports = deleteFavorite;
