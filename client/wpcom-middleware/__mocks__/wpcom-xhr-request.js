const handler = jest.fn().mockImplementation( ( params, callback ) => {
	if ( params.method === 'put' ) {
		callback( new Error( ':-(' ) );
	} else {
		callback( undefined, { great_success: true } );
	}
} );

export default handler;
