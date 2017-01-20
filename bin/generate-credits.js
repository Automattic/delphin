const {
	keys,
	includes,
	values,
	zipWith
} = require( 'lodash' );
const nlf = require( 'nlf' );
const { dependencies } = require( '../package.json' );

const dependencyIds = zipWith(
	keys( dependencies ),
	values( dependencies ),
	( name, id ) => `${ name }@${ id }`
);

nlf.find( {
	summaryMode: 'off',
}, ( err, data ) => {
	const licenseInformation = data.reduce( ( result, module ) => {
		// TODO: find a way to process also GitHub links like @automattic/dops-components
		if ( includes( dependencyIds, module.id ) ) {
			result.push( [ module.name, module.repository, module.summary() ] );
		}

		return result;
	}, [] );

	console.log( licenseInformation );
} );
