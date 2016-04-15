// External dependencies
var express = require( 'express' ),
	req = require( 'superagent' ),
	bodyParser = require( 'body-parser' ),
	WPCOM = require( 'wpcom' );

// Internal dependencies
var secrets = require( './secrets.json' );

var wpcomAPI = WPCOM();

module.exports = function wpcomRestApiProxy() {
	const app = express();

	app.get( '/domains/suggestions', function( request, response ) {
		const payload = {
			query: request.query.query,
			quantity: 10,
			include_wordpressdotcom: false
		};

		wpcomAPI.req.get( '/domains/suggestions', payload, function( error, results ) {
			results.pop();
			response.send( results );
		} );

	} );

	app.use( bodyParser.json() ).post( '/users/new', function( request, response ) {
		var payload = request.body;
		payload.client_id = secrets.wordpress_rest_api_client_id;
		payload.client_secret = secrets.wordpress_rest_api_oauth_client_secret;

		wpcomAPI.req.post( '/users/new', payload, function( error, results ) {
			response.send( results );
		} );
	} );

	return app;
};
