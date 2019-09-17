// add .env file see
require('dotenv').config();
// const createError = require('http-errors');
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const chalk = require('chalk');
// const helmet = require('helmet');
// const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./config/swagger.json');

// Config
const mode = process.env.NODE_ENV || 'development';

const config = require('./config/config');

const { apiPATH, apiVersion } = config;

// middleware

// Import Router
const router = require('./routes/routes');
const ssrRouter = require('./routes/ssr.router');

// start App - Express
const app = express();

const startServer = PORT => {
	// view engine setup
	// React view engine setup
	app.set('views', path.join(__dirname, '/views'));
	app.set('view engine', 'jsx');
	// const viewEngineOptions = { beautify: true };
	app.engine('jsx', require('express-react-views').createEngine());

	// Add Middleware to Express
	if (mode) app.use(logger('dev'));

	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(cookieParser());
	app.use(
		session({
			secret: 'super-secret-key',
			resave: false,
			saveUninitialized: false,
			cookie: { maxAge: 60000 },
		}),
	);

	// Set Secure to Server
	app.disable('x-powered-by');
	// app.use(cors('*'));
	// app.use(helmet());
	app.use(
		sassMiddleware({
			src: path.join(__dirname, 'public'),
			dest: path.join(__dirname, 'public'),
			indentedSyntax: true, // true = .sass and false = .scss
			sourceMap: true,
		}),
	);

	app.use(passport.initialize());
	app.use(passport.session());

	require('./services/passport')(passport);

	app.use(express.static(path.join(__dirname, 'public')));

	app.use(apiPATH + apiVersion, router);
	app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
	app.use('/', ssrRouter);

	// error handler
	app.use((err, req, res) => {
		// set locals, only providing error in development

		res.locals.message = err.message;
		res.locals.error = req.app.get('env') === 'development' ? err : {};

		// render the error page

		res.status(err.status || 500);
		res.render('error');
	});

	app.listen(PORT, () => {
		console.log(
			`App listening on port ${chalk.yellow(`http://localhost:${PORT}`)} !`,
		);
		console.log(`Api route is ${chalk.blue(apiPATH + apiVersion)}`);
	});
};

module.exports = startServer;
