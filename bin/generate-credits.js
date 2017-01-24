/* eslint-disable quote-props */
const {
	each,
	keys,
	includes,
} = require( 'lodash' );
const fs = require( 'fs' );
const nlf = require( 'nlf' );
const path = require( 'path' );
const { dependencies, devDependencies } = require( '../package.json' );
const allDependencies = keys( Object.assign( {}, devDependencies, dependencies ) );
const projectRoot = path.dirname( __dirname );

nlf.find( {
	directory: projectRoot,
	summaryMode: 'off',
}, ( error, data ) => {
	if ( error ) {
		throw error;
	}

	const licenseInformation = data.reduce( ( result, module ) => {
		if ( includes( allDependencies, module.name ) ) {
			( result[ module.summary() ] || ( result[ module.summary() ] = {} ) )[ module.name ] = module.repository;
		}

		return result;
	}, {} );

	let licenseText = '';

	each( licenseInformation, ( packages, license ) => {
		licenseText += `${ license }\n`;
		each( packages, ( repository, name ) => {
			licenseText += `* ${ name }: ${ repository }\n`;
		} );
		licenseText += '\n';
	} );

	fs.writeFile( `${ projectRoot }/CREDITS.md`, licenseText, ( err ) => {
		if ( err ) {
			throw err;
		}

		console.log( 'Generated LICENSE.md file.' );
	} );
} );
