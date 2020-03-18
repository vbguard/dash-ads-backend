// const swagger = require('./config/swagger.js');
const oas = require('fastify-oas');
const fastifyJwt = require('fastify-jwt');
const fastifyCors = require('fastify-cors');
const { JWT_SECRET_KEY, URL } = require('./config/config');

// Require the framework and instantiate it
const app = require('fastify')({
	logger: {
		prettyPrint: false,
		serializers: {
			res(res) {
				// The default
				return {
					statusCode: res.statusCode
				};
			},
			req(req) {
				return {
					method: req.method,
					url: req.url,
					path: req.path,
					parameters: req.parameters,
					// Including the headers in the log could be in violation
					// of privacy laws, e.g. GDPR. You should use the "redact" option to
					// remove sensitive fields. It could also leak authentication data in
					// the logs.
					headers: req.headers
				};
			}
		}
	}
});

app
	.register(fastifyCors, {
		origin: '*',
		alowedHeaders: ['Origin', 'Accept', 'Content-Type', 'Authorization', 'X-Requested-Width'],
		methods: ['GET', 'POST', 'PUT', 'PUTCH', 'DELETE']
	})
	.register(fastifyJwt, { secret: JWT_SECRET_KEY })
	.register(oas, {
		routePrefix: '/documentation',
		exposeRoute: true,
		swagger: {
			info: {
				title: 'Test openapi',
				description: 'testing the fastify swagger api',
				version: '0.1.0'
			},
			externalDocs: {
				url: URL,
				description: 'Find more info here'
			},
			consumes: ['application/json'], // app-wide default media-type
			produces: ['application/json'], // app-wide default media-type
			servers: [
				{
					url: URL,
					description: 'Optional server description, e.g. Main (production) server'
				}
			],
			components: {
				// see https://github.com/OAI/OpenAPI-Specification/blob/OpenAPI.next/versions/3.0.0.md#componentsObject for more options
				securitySchemes: {
					bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }
				}
			}
		}
	})

	.register(require('./modules'));

// Declare a route
// fastify.get('/', async (request, reply) => ({ hello: 'world' }));

// Run the server!
app.ready(err => {
	if (err) console.log(err);
	console.log('ready');
	console.log('URL', URL);
	app.oas();
});

module.exports = async port => {
	try {
		await app.listen(port);
		app.log.info(`server listening on ${app.server.address().port}`);
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};
