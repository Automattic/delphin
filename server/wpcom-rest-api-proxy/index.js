// External dependencies
import express from 'express';
import bodyParser from 'body-parser';
import WPCOM from 'wpcom';

// Internal dependencies
import secrets from 'server/secrets.json';


module.exports = function wpcomRestApiProxy() {
	const app = express();

	app.use( bodyParser.json() ).post( '/users/new', function( request, response ) {
		let payload = request.body;
		payload.client_id = secrets.wordpress.rest_api_oauth_client_id;
		payload.client_secret = secrets.wordpress.rest_api_oauth_client_secret;

		WPCOM().req.post( '/users/new', payload, function( error, results ) {
			response.status( ( error && error.code ) || 200 ).send( error || results );
		} );
	} );

	app.use( bodyParser.json() ).post( '/sites/new', function( request, response ) {
		let payload = request.body;
		payload.client_id = secrets.wordpress.rest_api_oauth_client_id;
		payload.client_secret = secrets.wordpress.rest_api_oauth_client_secret;

		if ( ! payload.bearer_token ) {
			response.status( 400 ).send( { message: 'Requests to this endpoint must be authenticated' } );
		}

		WPCOM( payload.bearer_token ).req.post( '/sites/new', payload, function( error, results ) {
			response.status( ( error && error.code ) || 200 ).send( error || results );
		} );
	} );

	app.use( bodyParser.json() ).post( '/me/transactions', function( request, response ) {
		const payload = request.body;

		if ( ! payload.bearer_token ) {
			response.status( 400 ).send( { message: 'Requests to this endpoint must be authenticated' } );
		}

		WPCOM( payload.bearer_token ).req.post( '/me/transactions', payload, ( error, results ) => {
			response.status( ( error && error.code ) || 200 ).send( error || results );
		} );
	} );

	return app;
};
