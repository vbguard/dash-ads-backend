const router = require('express').Router();
const passport = require('passport');

const { createCategory, deleteategory, updateCategory, getAllCategories } = require('../controllers/category');

const passportCheck = passport.authenticate('jwt', {
	session: false
});

router
	.get('/', getAllCategories)
	.post('/', createCategory)
	.delete('/:catId', deleteategory)
	.put('/:catId', updateCategory);

module.exports = router;
