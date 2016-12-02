const clear = require( 'clear' );
const inquirer = require( 'inquirer' );
const includes = require( 'lodash/includes' );

const scaffolding = require( './lib/scaffolding' );

clear(); // clear the terminal

inquirer.prompt( [
	{
		type: 'input',
		name: 'rawName',
		message: 'What is your component\'s name? (camel or kebab case are fine)',
		validate: input => !! input
	},
	{
		type: 'list',
		name: 'stateless',
		message: 'Stateless or stateful?',
		choices: [
			{ value: true, name: 'stateless' },
			{ value: false, name: 'stateful' },
		],
		default: true
	},
	{
		type: 'checkbox',
		name: 'options',
		message: 'What does your component need?',
		choices: [
			{ value: 'container', name: 'a container' },
			{ value: 'stylesheet', name: 'a stylesheet' },
			{ value: 'subDirectory', name: 'to be added to a specific directory' },
		]
	},
	{
		type: 'input',
		name: 'subDirectory',
		message: 'Which sub-directory in `app/components/ui/`? (e.g. set-up-domain)',
		when: answers => includes( answers.options, 'subDirectory' )
	},
] ).then( answers => {
	console.log(); // pad the output

	const rawName = answers.rawName,
		isStateless = answers.stateless,
		subDirectory = answers.subDirectory || '',
		options = answers.options;

	scaffolding.createUiComponent( rawName, {
		subDirectory,
		isStateless,
		withStylesheet: includes( options, 'stylesheet' )
	} );

	if ( includes( options, 'container' ) ) {
		scaffolding.createContainer( rawName, { subDirectory } );
	}
} ).catch( console.error );
