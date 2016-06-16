jest.disableAutomock();

/**
 * External dependencies
 */
const assert = require( 'assert' );

/**
 * Internal dependencies
 */
const creditCardDetails = require( '../' );

function getRandomInt( min, max ) {
	return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
}

describe( 'index', function() {
	describe( 'Validation', function() {
		describe( 'Discover Card: range 622126-622925', function() {
			const randomNumberBetweenRange = getRandomInt( 622126, 622925 ).toString();

			it( 'should return null for 622125', function() {
				assert.equal( null, creditCardDetails.getCreditCardType( '622125' ) );
			} );

			it( 'should return `discover` for 622126', function() {
				assert.equal( 'discover', creditCardDetails.getCreditCardType( '622126' ) );
			} );

			it( 'should return `discover` for ' + randomNumberBetweenRange + ' (a random number between 622126 and 622925)', function() {
				assert.equal( 'discover', creditCardDetails.getCreditCardType( randomNumberBetweenRange ) );
			} );

			it( 'should return `discover` for 622925', function() {
				assert.equal( 'discover', creditCardDetails.getCreditCardType( '622925' ) );
			} );

			it( 'should return null for 622926', function() {
				assert.equal( null, creditCardDetails.getCreditCardType( '622926' ) );
			} );
		} );
	} );
} );
