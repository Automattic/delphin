/***
 * Binds all functions on object prototype to current instance that start with the word 'handle'
 * @param {Object} obj The object to bind
 */
export function bindHandlers( obj ) {
	if ( typeof obj !== 'object' || obj === null ) {
		throw new Error( 'bindHandlers can handle only objects' );
	}

	Object.getOwnPropertyNames( Object.getPrototypeOf( obj ) )
		.filter( ( prop ) => prop.indexOf( 'handle' ) === 0 )
		.filter( ( prop ) => typeof obj[ prop ] === 'function' )
		.forEach( ( prop ) => obj[ prop ] = obj[ prop ].bind( obj ) );
}
