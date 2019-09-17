const React = require('react');
const Template = require('../layouts/default.jsx');

class HelloMessage extends React.Component {
	render() {
		return (
			<Template title={'Not Found 404'}>
				<h1>404 not found</h1>
			</Template>
		);
	}
}

module.exports = HelloMessage;
