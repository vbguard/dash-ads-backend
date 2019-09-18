const Ads = require('../../models/ads.model.js');
const { ValidationError } = require('../../core/error');

const getAllAds = async (req, res) => {
	const { search, date, alphabet, limit, page } = req.query;

	const sendResponse = ads => {
		res.json({
			status: 'success',
			ads
		});
	};

	const sendError = error => {
		const errMessage = error.message || 'must handle this error on registration';
		res.json({
			status: 'error',
			error: errMessage
		});
	};

	const searchFilter = search ? { title: { $regex: search,
$options: 'i' },
isActive: true } : { isActive: true };

	const options = {
		page: page || 1,
		limit: limit || 10
	};

	Ads.paginate(searchFilter, options, (err, result) => {
		// result.docs
		// result.totalDocs = 100
		// result.limit = 10
		// result.page = 1
		// result.totalPages = 10
		// result.hasNextPage = true
		// result.nextPage = 2
		// result.hasPrevPage = false
		// result.prevPage = null
		// result.pagingCounter = 1
		if (err) return sendError(err);

		if (!result) {
			sendError({ message: 'no such goal' });
			return;
		}

		sendResponse(result);
	});
};

module.exports = getAllAds;

// const Products = require(`../../model/products.model`);

// const getProducts = (req, res) => {
// 	const { search } = req.query;
// 	const { user } = req;

// 	const sendResponse = products => {
// 		res.json({
// 			status: 'success',
// 			productsOptions: products,
// 		});
// 	};

// 	const sendError = (err, code) => {
// 		const status = code || 404;
// 		res.status(status).json({
// 			message: err.message,
// 			err,
// 		});
// 	};

// 	const formatRespAndCheckBlood = el => {
// 		let formatProduct = {
// 			value: el._id,
// 			label: el.title.ru,
// 			color: '#000',
// 		};
// 		if (user.userData) {
// 			const { groupBlood } = user.userData;
// 			formatProduct = {
// 				...formatProduct,
// 				color:
// 					el.groupBloodNotAllowed[String(groupBlood)] === true
// 						? '#c32323'
// 						: '#000',
// 			};
// 		}
// 		return formatProduct;
// 	};

// 	const searchFilter = search
// 		? { 'title.ru': { $regex: search, $options: 'i' } }
// 		: null;

// 	Products.find(searchFilter)
// 		// .sort({ 'title.ru': 1 })
// 		.lean()
// 		.then(products => {
// 			products.sort((a, b) => {
// 				const indexA = a.title.ru.toLowerCase().indexOf(search.toLowerCase());
// 				const indexB = b.title.ru.toLowerCase().indexOf(search.toLowerCase());
// 				if (indexA > indexB) {
// 					return 1;
// 				}
// 				if (indexA < indexB) {
// 					return -1;
// 				}
// 				return 0;
// 			});
// 			return products;
// 		})
// 		.then(products => products.map(formatRespAndCheckBlood))
// 		.then(sendResponse)
// 		.catch(sendError);
// };

// module.exports = getProducts;
