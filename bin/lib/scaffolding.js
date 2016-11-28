const fs = require( 'fs' );
const camelCase = require( 'lodash/camelCase' );
const upperFirst = require( 'lodash/upperFirst' );
const kebabCase = require( 'lodash/kebabCase' );
const join = require( 'path' ).join;
const times = require( 'lodash/times' );

const componentCase = name => upperFirst( camelCase( name ) );

const createDirectory = path => {
	const directories = path.split( '/' ).filter( x => x );

	times( directories.length, n => {
		const current = directories.slice( 0, n + 1 ).join( '/' );

		if ( ! fs.existsSync( current ) ) {
			fs.mkdirSync( current );

			console.log( `Created ${ current }` );
		}
	} );
};

const createFile = ( path, content ) => {
	fs.writeFileSync( path, content, 'utf8' );

	console.log( `Created ${ path }` );
};

const createModule = ( path, externalDependencies, internalDependencies, body, exports ) => {
	createDirectory( join( path, '..' ) );

	const module = [].concat(
		'// External dependencies',
		externalDependencies,
		'',
		'// Internal dependencies',
		internalDependencies,
		'',
		body,
		'',
		exports,
		''
	).join( '\n' );

	createFile( path, module );
};

const getStatelessComponent = name => (
[
	`const ${ componentCase( name ) } = () => (`,
	'	<div>Hello world</div>',
	');'
].join( '\n' )
);

const getStatefulComponent = name => (
[
	`class ${ componentCase( name ) } extends Component {`,
	'	render() {',
	'		return (',
	'			<div>Hello world</div>',
	'		);',
	'	}',
	'}',
	'',
	`${ componentCase( name ) }.propTypes = {};`,
].join( '\n' )
);

const getUiComponentPath = ( name, subDirectory ) => join( 'app', 'components', 'ui', subDirectory || '', kebabCase( name ) );

const createUiComponent = ( name, options ) => {
	options = options || {};

	const path = join( getUiComponentPath( name, options.subDirectory ), 'index.js' );

	const externalDependencies = [
		"import React, { Component, PropTypes } from 'react';",
		options.withStylesheet ? "import withStyles from 'isomorphic-style-loader/lib/withStyles';" : false
	].filter( x => x );

	createModule(
		path,
		externalDependencies,
		options.withStylesheet
			? "import styles from './styles.scss';"
			: '',
		options.isStateless ? getStatelessComponent( name ) : getStatefulComponent( name ),
		options.withStylesheet
			? `export default withStyles( styles )( ${ componentCase( name ) } );`
			: `export default ${ componentCase( name ) };`
	);

	if ( options.withStylesheet ) {
		fs.writeFileSync( join( getUiComponentPath( name, options.subDirectory ), 'styles.scss' ), '' );
	}
};

const createContainer = ( name, options ) => {
	options = options || {};

	const path = join( 'app', 'components', 'containers', options.subDirectory || '', `${ kebabCase( name ) }.js` );

	createModule(
		path,
		"import { connect } from 'react-redux';",
		`import { ${ componentCase( name ) } } from '${ getUiComponentPath( name, options.subDirectory ) }';`,
		'',
		`export default connect()( ${ componentCase( name ) } );`
	);
};

module.exports = {
	createDirectory,
	createModule,
	getStatefulComponent,
	createUiComponent,
	createContainer,
};
