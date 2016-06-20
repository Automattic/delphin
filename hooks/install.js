const fs = require( 'fs' );
const path = require( 'path' );

const customHook = path.resolve( __dirname, 'lint' );
const defaultHook = path.resolve( __dirname, '..', '.git', 'hooks', 'pre-commit' );

fs.access( defaultHook, ( error ) => {
	if ( ! error ) {
		fs.unlinkSync( defaultHook );
	}

	fs.linkSync( customHook, defaultHook );
} );
