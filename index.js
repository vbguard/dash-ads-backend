// add .env file see
require('dotenv').config();

const startServer = require(`./app.js`);
const config = require('./config/config');

const connectToDB = require(`./config/mongodb`);

const PORT = config.PORT;
const DATABASE_URL = config.mongoURI;

startServer(PORT);
connectToDB(DATABASE_URL);
