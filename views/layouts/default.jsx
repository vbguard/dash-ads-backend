const React = require('react');

const { Component } = React;

class DefaultLayout extends Component {
	render() {
		const { title, styles } = this.props;
		return (
			<html>
				<head>
					<title>{title}</title>
					{styles && styles.map(style => <link rel="stylesheet" href={style} />)}
				</head>
				<body>{this.props.children}</body>
			</html>
		);
	}
}

module.exports = DefaultLayout;
