const Ads = require('../../models/ads.model.js');
const { ValidationError } = require('../../core/error');

const getAllAds = (req, res) => {
	const sendResponse = ads => {
		res.json({
			status: 'success',
			ads,
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

	Ads.find(
		{},
		{
			__v: 0,
			updatedAt: 0,
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

module.exports = getAllAds;
