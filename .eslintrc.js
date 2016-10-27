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
		'react/prop-types': 2,
		'react/sort-prop-types': 2,

		// Legacy
		'max-len': [ 1, { code: 140 } ],
		'no-console': 1,
		'prefer-const': 1,
		'react/jsx-no-target-blank': 1,
		'react/prefer-es6-class': 1,
		'quote-props': [ 1, 'as-needed' ],
		'wpcalypso/import-docblock': 0,
		'wpcalypso/jsx-classname-namespace': 1,
		'wpcalypso/jsx-gridicon-size': 1
	}
};
