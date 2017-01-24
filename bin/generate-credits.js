/* eslint-disable quote-props */
const { flow } = require( 'lodash' );
const fs = require( 'fs' );
const nlf = require( 'nlf' );
const path = require( 'path' );
const { dependencies, devDependencies } = require( '../package.json' );
const allDependencies = Object.keys( Object.assign( {}, devDependencies, dependencies ) );
const projectRoot = path.dirname( __dirname );

function extractLicenceInformation( data ) {
	return data.reduce( ( result, module ) => {
		if ( allDependencies.includes( module.name ) ) {
			if ( ! result[ module.summary() ] ) {
				result[ module.summary() ] = {};
			}

			result[ module.summary() ][ module.name ] = module.repository;
		}

		return result;
	}, {} );
}

function formatLicenseInformation( licenseInformation ) {
	const output = [
		'Credits',
		'=======',
		"This project makes use of Open Source components. Below is a list of these components included in this project's source code, and their license information. This project also uses js packages released by NPM, see [package.json](/package.json). Source code and license information for each of these packages is available at https://npmjs.org. Many thanks to all of the original authors!",
		'',
	];

	Object.keys( licenseInformation ).sort().forEach( ( license ) => {
		const packages = licenseInformation[ license ];
		output.push( `### ${ license }` );
		Object.keys( packages ).forEach( ( name ) => {
			output.push( `* ${ name }: ${ packages[ name ] }` );
		} );
		output.push( '' );
	} );

	return output.join( '\n' );
}

function saveOutput( output ) {
	fs.writeFile( `${ projectRoot }/CREDITS.md`, output, ( error ) => {
		if ( error ) {
			throw error;
		}

		console.log( 'Generated CREDITS.md file.' );
	} );
}

nlf.find( {
	directory: projectRoot,
	summaryMode: 'off',
}, ( error, data ) => {
	if ( error ) {
		throw error;
	}

	flow( extractLicenceInformation, formatLicenseInformation, saveOutput )( data );
} );
