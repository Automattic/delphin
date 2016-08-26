
import request from 'superagent';
import jsonp from 'superagent-jsonp';

export function subscribeUser( email, domainName ) {
	return new Promise( ( resolve, reject ) => {
		const queryParams = {
			u: '4471f40dba4ec0e34130a91a5',
			id: '3358410f08',
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

				resolve( response.body );
			} );
	} );
}

