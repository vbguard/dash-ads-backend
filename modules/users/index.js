// const requiredAuth =require('package');
const handlers = require('./handlers');

module.exports = async function routes(fastify) {
	fastify.get(
		'/users/me',
		{
			// onRequest: requiredAuth
			schema: {
				// hide: true,
				params: {
					type: 'object',
					properties: {
						id: {
							type: 'string',
							description: 'user id'
						}
					}
				},
				response: {
					200: {
						description: 'Successful response',
						type: 'object',
						properties: {
							hello: { type: 'string' },
							bye: { type: 'string' },
							num: { type: 'number' }
						}
					},
					201: {
						description: 'Successful response',
						type: 'object',
						properties: {
							hello: { type: 'string' }
						}
					}
				}
			}
		},
		handlers.getMe
	);
};
