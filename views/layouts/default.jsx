const React = require('react');

const { Component } = React;

class DefaultLayout extends Component {
	render() {
		return (
			<html>
				<head><title>{this.props.title}</title></head>
				<body>{this.props.children}</body>
			</html>
		);
	}
}

module.exports = DefaultLayout;
