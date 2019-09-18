const Categories = require('../../models/categories.model');

const deleteCategory = (req, res) => {
	const { catId } = req.params;

	const sendResponse = () => {
		res.json({
			status: 'success'
		});
	};

	const sendError = error => {
		const errMessage = error.message || 'Must handle this error';
		res.status(400).json({
			status: 'error',
			message: errMessage
		});
	};

	Categories.findByIdAndDelete(catId)
		.then(category => {
			if (!category) {
				sendError({ message: 'No such category' });
				return;
			}

			sendResponse(category);
		})
		.catch(sendError);
};

module.exports = deleteCategory;
