const fs = require( 'fs' );

export const createModule = ( path, externalDependencies, internalDependencies, body ) => {
	const module = [].concat(
		'// External dependencies',
		externalDependencies,
		'',
		'// Internal dependencies',
		internalDependencies,
		'',
		body,
		''
	).join( '\n' );

	fs.writeFileSync( path, module, 'utf8' );
};
