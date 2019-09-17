const React = require('react');

class HelloMessage extends React.Component {
	render() {
		return (
			<>
				<div>Hello {this.props.name}</div>
				<h1>It is a Test component server side rendering</h1>
				<h2>made with ❤️ ReactJS</h2>
			</>
		);
	}
}

module.exports = HelloMessage;
