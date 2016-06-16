/**
 * Internal dependencies
 */
var validation = require( './validation' );

module.exports = {
	getCreditCardType: validation.getCreditCardType,
	validateCardDetails: validation.validateCardDetails
};
