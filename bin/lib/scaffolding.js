const fs = require( 'fs' );
const camelCase = require( 'lodash/camelCase' );
const upperFirst = require( 'lodash/upperFirst' );
const identity = require( 'lodash/identity' );
const kebabCase = require( 'lodash/kebabCase' );
const join = require( 'path' ).join;
const times = require( 'lodash/times' );

const componentCase = name => upperFirst( camelCase( name ) );

const createDirectory = path => {
	const directories = path.split( '/' ).filter( identity );

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

const getPropTypes = ( name, props ) => {
	return [].concat(
		`${ componentCase( name ) }.propTypes = {`,
		props.sort().map( propName => `	${ propName }: PropTypes.any.isRequired,` ),
		'};'
	).join( '\n' );
};

const getStatelessComponent = ( name, props ) => {
	return [
		`const ${ componentCase( name ) } = () => (`,
		'	<div>Hello world</div>',
		');',
		'',
	].concat( getPropTypes( name, props ) ).join( '\n' );
};

const getStatefulComponent = ( name, props ) => {
	return [
		`class ${ componentCase( name ) } extends Component {`,
		'	render() {',
		'		return (',
		'			<div>Hello world</div>',
		'		);',
		'	}',
		'}',
		'',
	].concat( getPropTypes( name, props ) ).join( '\n' );
};

const getUiComponentPath = ( name, subDirectory ) => join( 'app', 'components', 'ui', subDirectory || '', kebabCase( name ) );

const createUiComponent = ( name, options ) => {
	options = options || {};

	const path = join( getUiComponentPath( name, options.subDirectory ), 'index.js' );

	const reactVariables = [
		options.isStateless ? false : 'Component',
		'PropTypes'
	].filter( identity ).join( ', ' );
	const externalDependencies = [
		`import React, { ${ reactVariables } } from 'react';`,
		options.withStylesheet ? "import withStyles from 'isomorphic-style-loader/lib/withStyles';" : false
	].filter( identity );

	createModule(
		path,
		externalDependencies,
		options.withStylesheet
			? "import styles from './styles.scss';"
			: '',
		options.isStateless ? getStatelessComponent( name, options.props ) : getStatefulComponent( name, options.props ),
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
		`import ${ componentCase( name ) } from '${ getUiComponentPath( name, options.subDirectory ) }';`,
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
