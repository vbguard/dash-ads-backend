const Ads = require('../../models/ads.model.js');
const User = require('../../models/user.model.js');

const { ValidationError } = require('../../core/error');

const deleteAds = (req, res) => {
	const userId = req.user._id;
	const adsId = req.params.adsId;

	const sendResponse = () => {
		res.json({
			status: 'success',
		});
	};

	const sendError = error => {
		const errMessage
			= error.message || 'must handle this error on registration';
		res.json({
			status: 'error',
			error: errMessage,
		});
	};

	Ads.findByIdAndDelete({
		userId,
		_id: adsId,
	})
		.then(ads => {
			if (!ads) sendError({ message: 'No such goal' });

			User.findByIdAndUpdate(userId, { $pull: { goals: adsId } })
				.then(sendResponse)
				.catch(err => {
					throw new ValidationError(err.message);
				});
		})
		.catch(err => {
			throw new ValidationError(err.message);
		});
};

module.exports = deleteAds;
