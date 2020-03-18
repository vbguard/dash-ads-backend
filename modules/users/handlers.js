exports.getMe = async function(req, res) {
	// const { uid } = req.user;
	// return { hello: 'Test', num: '2124124' };
	res.code(201).send({ hello: 'Test', num: '2124124' });
};
