const fs = require( 'fs' );
const path = require( 'path' );

const defaultHook = path.resolve( __dirname, '..', '.git', 'hooks', 'pre-commit' );

fs.unlinkSync( defaultHook );
