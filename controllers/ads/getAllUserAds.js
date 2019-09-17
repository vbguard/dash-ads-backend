const Ads = require('../../models/ads.model.js');
const { ValidationError } = require('../../core/error');

const getAllUserAds = (req, res) => {
	const userId = req.user._id;

	const sendResponse = ads => {
		res.json({
			status: 'success',
			ads,
		});
	};

	Ads.find(
		{ userId },
		{
			__v: 0,
			userId: 0,
		},
	)
		.then(sendResponse)
		.catch(err => {
			throw new ValidationError(err.message);
		});
};

module.exports = getAllUserAds;
