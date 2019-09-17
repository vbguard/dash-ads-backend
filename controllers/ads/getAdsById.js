const Ads = require('../../models/ads.model.js');
const { ValidationError } = require('../../core/error');

const getAdsById = (req, res) => {
	const userId = req.user._id;
	const adsId = req.params.adsId;

	const sendResponse = goal => {
		res.json({
			status: 'success',
			goal,
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

	Ads.findById(
		{
			userId,
			_id: adsId,
		},
		{
			__v: 0,
			userId: 0,
		},
	)
		.then(ads => {
			if (!ads) {
				sendError({ message: 'no such goal' });
				return;
			}
			sendResponse(ads);
		})
		.catch(err => {
			throw new ValidationError(err.message);
		});
};

module.exports = getAdsById;
