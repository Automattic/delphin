const {
	keys,
	includes
} = require( 'lodash' );
const nlf = require( 'nlf' );
const { dependencies, devDependencies } = require( '../package.json' );
const path = require( 'path' );
const allDependencies = keys( Object.assign( {}, devDependencies, dependencies ) );

const results = nlf.find( {
	directory: path.dirname( __dirname ),
	summaryMode: 'off',
}, ( err, data ) => {
	const licenseInformation = data.reduce( ( result, module ) => {
		if ( includes( allDependencies, module.name ) ) {
			( result[module.summary()] || ( result[module.summary()] = {} ) )[module.name] = module.repository;
		}

		return result;
	}, {} );

	console.log( licenseInformation );
} );
