/* eslint-disable quote-props */
module.exports = {
	'root': true,
	'extends': 'wpcalypso/react',
	'parser': 'babel-eslint',
	'env': {
		'browser': true,
		'jasmine': true,
		'jest': true,
		'node': true
	},
	'rules': {
		// REST API objects include underscores
		'camelcase': 0,
		// Custom PropTypes checks
		'react/jsx-no-target-blank': 1,
		'react/prop-types': 2,
		'react/sort-prop-types': 2,

		// Disable new rules that trigger errors
		'max-len': 0,
		'no-console': 0,
		'prefer-const': 0,
		'react/prefer-es6-class': 0,
		'quote-props': 0,
		'wpcalypso/import-docblock': 0,
		'wpcalypso/jsx-classname-namespace': 0,
		'wpcalypso/jsx-gridicon-size': 0
	}
};
