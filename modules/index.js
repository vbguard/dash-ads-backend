const users = require('./users');

module.exports = async function registeredModules(fastify, options = {}) {
	options.prefix = '/api';
	fastify.register(users, options);
};
