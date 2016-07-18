// External dependencies
import express from 'express';
import bodyParser from 'body-parser';
import WPCOM from 'wpcom';
import fs from 'fs';

// Internal dependencies
import { fileExists } from '../utils';

let rest_api_oauth_client_id = process.env.REST_API_OAUTH_CLIENT_ID,
	rest_api_oauth_client_secret = process.env.REST_API_OAUTH_CLIENT_SECRET;

if ( ! rest_api_oauth_client_id && fileExists( 'server/secrets.json' ) ) {
	const secrets = JSON.parse( fs.readFileSync( 'server/secrets.json' ) );
	rest_api_oauth_client_id = secrets.wordpress.rest_api_oauth_client_id;
	rest_api_oauth_client_secret = secrets.wordpress.rest_api_oauth_client_secret;
}

const createEndpointProxy = ( app, endpoint ) => (
	app.post( endpoint, ( request, response ) => {
		const payload = Object.assign( {}, request.body, {
			client_id: rest_api_oauth_client_id,
			client_secret: rest_api_oauth_client_secret
		} );

		WPCOM().req.post( endpoint, payload, ( error, results ) => {
			response.status( ( error && error.statusCode ) || 200 ).send( error || results );
		} );
	} )
);

module.exports = function wpcomRestApiProxy() {
	const app = express();

	app.use( bodyParser.json() );

	createEndpointProxy( app, '/users/email' );

	createEndpointProxy( app, '/users/email/new' );

	createEndpointProxy( app, '/users/email/verification' );

	return app;
};
