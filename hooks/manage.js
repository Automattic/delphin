const args = require( 'minimist' )( process.argv.slice( 2 ) );
const fs = require( 'fs' );
const path = require( 'path' );

/**
 * Filter the specified list of hook names to only keep the ones supported.
 *
 * @param {array|string} names - name or list of hook names
 * @returns {array} the list of hook names filtered
 */
function filter( names ) {
	const hooks = [ 'pre-commit', 'pre-push' ];

	if ( ! Array.isArray( names ) ) {
		names = [ names ];
	}

	return names.filter( name => {
		return hooks.indexOf( name ) !== -1;
	} );
}

/**
 * Setup linter to run for the specified hook.
 *
 * @param {string} name - hook name
 */
function install( name ) {
	const hook = path.resolve( __dirname, '..', '.git', 'hooks', name );
	const linter = path.resolve( __dirname, 'lint' );

	fs.access( hook, ( error ) => {
		if ( ! error ) {
			fs.unlinkSync( hook );
		}

		fs.linkSync( linter, hook );

		console.log( `Enabled linting at ${ name } time` );
	} );
}

/**
 * Disable the specified hook.
 *
 * @param {string} name - hook name
 */
function uninstall( name ) {
	const hook = path.resolve( __dirname, '..', '.git', 'hooks', name );

	fs.access( hook, ( error ) => {
		if ( ! error ) {
			fs.unlinkSync( hook );

			console.log( `Disabled ${ name } hook` );
		}
	} );
}

if ( args.i ) {
	filter( args.i ).map( install );
} else if ( args.u ) {
	filter( args.u ).map( uninstall );
}

