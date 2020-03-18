const config = require('./config');

module.exports = {
	routePrefix: '/doс',
	swagger: {
		info: { title: 'DashAds', description: '', version: '0.0.1' },
		servers: [{ url: config.URL }],
		components: {
			securitySchemes: {
				bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }
			}
		},
		consumes: ['application/json'],
		produces: ['application/json']
	},
	exposeRoute: true
};
