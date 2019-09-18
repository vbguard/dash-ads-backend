const Joi = require('joi');
const Categories = require('../../models/categories.model');

const updateCategory = (req, res) => {
	const schema = Joi.object()
		.keys({
			category: Joi.string()
				.min(3)
				.max(20)
				.required()
		})
		.options({
			stripUnknown: true,
			abortEarly: false
		});

	const result = schema.validate(req.body);

	const sendError = error => {
		const errMessage = error.message || 'Must handle this error';
		res.status(400).json({
			status: 'error',
			message: errMessage
		});
	};

	if (result.error) {
		sendError(result.error);
		return;
		// throw new ValidationError(result.error.message);
	}

	const { catId } = req.params;
	const validData = result.value;

	const sendResponse = category => {
		res.json({
			status: 'success',
			category
		});
	};

	Categories.findByIdAndUpdate(catId, validData, { new: true })
		.then(category => {
			if (!category) {
				sendError({ message: 'No such category' });
				return;
			}

			sendResponse(category.getPublicFields());
		})
		.catch(sendError);
};

module.exports = updateCategory;
