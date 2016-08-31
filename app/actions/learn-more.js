// External dependencies
import i18n from 'i18n-calypso';
import request from 'superagent';
import jsonp from 'superagent-jsonp';

export function subscribeUser( email, domainName ) {
	return new Promise( ( resolve, reject ) => {
		const queryParams = {
			u: '4471f40dba4ec0e34130a91a5',
			id: 'd1fefd318f',
			MERGE0: email,
			MERGE1: domainName
		};

		request.get( 'https://wordpress.us8.list-manage.com/subscribe/post-json?' )
			.use( jsonp( { timeout: 5000, callbackParam: 'c' } ) )
			.query( queryParams )
			.end( ( error, response ) => {
				if ( error ) {
					return reject( new Error( error ) );
				}

				if ( response.body.msg ) {
					// translate default success response
					if ( ~response.body.msg.indexOf( 'We need to confirm your email address.' ) ) {
						response.body.msg = i18n.translate( 'Almost finished… We need to confirm your email address. ' +
							'To complete the subscription process, please click the link in the email we just sent you.' );
					}

					if ( ~response.body.msg.indexOf( 'is already subscribed to list' ) ) {
						response.body.msg = i18n.translate( 'You are already subscribed to this list.' );
					}
				}

				resolve( response.body );
			} );
	} );
}

