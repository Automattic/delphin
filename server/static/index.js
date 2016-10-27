let express = require( 'express' ),
	serveStatic = require( 'serve-static' ),
	path = require( 'path' ),
	publicDir = path.resolve( __dirname, '../../public' ),
	app = express();

app.use( serveStatic( path.join( publicDir, 'static' ), { index: [ 'index.html' ] } ) );
app.use( serveStatic( publicDir ) );
app.get( '*', function( req, res ) {
	res.sendFile( path.join( publicDir, 'static', 'index.html' ) );
} );

app.listen( 1337, function( error ) {
	if ( error ) {
		throw error;
	}
	console.log( 'Static server started on http://localhost:' + 1337 );
} );
