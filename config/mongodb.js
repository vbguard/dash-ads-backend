const mongoose = require('mongoose');

const connectDB = dbUrl => {
	mongoose
		.connect(dbUrl, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		})
		.then(() => {
			console.log('MongoDB Connected...');
		})
		.catch(err => {
			console.error(err.message);
			process.exit(1);
		});
};

module.exports = connectDB;
