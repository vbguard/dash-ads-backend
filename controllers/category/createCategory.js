const Joi = require('joi');
const Categories = require('../../models/categories.model');
const { ValidationError } = require('../../core/error');

const createCategory = (req, res) => {
	const schema = Joi.object()
		.keys({
			category: Joi.string()
				.min(3)
				.max(20)
				.required(),
			_id: Joi.number()
				.min(1)
				.max(10)
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

	const sendResponse = category => {
		res.json({
			status: 'success',
			category
		});
	};

	const validData = result.value;

	const newCategory = new Categories({
		...validData
	});

	newCategory
		.save()
		.then(category => {
			sendResponse(category.getPublicFields());
		})
		.catch(sendError);
};

module.exports = createCategory;
