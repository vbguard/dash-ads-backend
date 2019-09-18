const Categories = require('../../models/categories.model');

const getAllCategories = (req, res) => {
	const sendResponse = categories => {
		res.json({
			status: 'success',
			categories
		});
	};

	const sendError = error => {
		const errMessage = error.message || 'Must handle this error';
		res.status(400).json({
			status: 'error',
			message: errMessage
		});
	};

	const options = {
		__v: 0,
		createdAt: 0,
		updatedAt: 0
	};

	Categories.find({}, options)
		.then(sendResponse)
		.catch(sendError);
};

module.exports = getAllCategories;
