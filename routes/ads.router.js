const router = require('express').Router();

const { createAds, getAllUserAds, deleteAds, updateAds, getAdsById } = require('../controllers/ads/index');

router
	.post('/', createAds)
	.get('/', getAllUserAds)
	.get('/:adsId', getAdsById)
	.patch('/:adsId', updateAds)
	.delete('/:adsId', deleteAds);

module.exports = router;
