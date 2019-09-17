const React = require('react');
const Template = require('../layouts/default.jsx');

const HelloMessage = () => {
	const styles = [
		`/public/css/notFound.css`,
		'/public/css/font-awesome.min.css',
		`https://fonts.googleapis.com/css?family=Muli:400`,
		`https://fonts.googleapis.com/css?family=Passion+One`,
	];

	return (
		<Template title={'Not Found 404'} styles={styles}>
			<div id="notfound">
				<div class="notfound-bg"></div>
				<div class="notfound">
					<div class="notfound-404">
						<h1>404</h1>
					</div>
					<h2>Oops! Page Not Found</h2>
					<div class="notfound-social">
						<a href="#"><i class="fa fa-facebook"></i></a>
						<a href="#"><i class="fa fa-twitter"></i></a>
						<a href="#"><i class="fa fa-pinterest"></i></a>
						<a href="#"><i class="fa fa-google-plus"></i></a>
					</div>
					<a href="/">Back To Homepage</a>
				</div>
			</div>
		</Template>
	);
};

module.exports = HelloMessage;
