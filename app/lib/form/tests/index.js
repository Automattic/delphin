// Internal dependencies
import { getAsyncValidateFunction, getCallingCode, isCallingCode, maskPhone, validateEmail } from '..';

describe( 'getAsyncValidateFunction', () => {
	pit( 'should resolve with no arguments if the validation returns no errors', () => {
		const asyncValidate = getAsyncValidateFunction( () => {} /* provide validate function that returns an empty object */ );

		return asyncValidate().then( noArgs => expect( noArgs ).toEqual( undefined ) );
	} );

	pit( 'should reject with error object if the validation returns errors', () => {
		const asyncValidate = getAsyncValidateFunction( values => {
			// return an error of 'foo' for each key
			return Object.keys( values ).reduce( ( errors, fieldName ) => {
				errors[ fieldName ] = 'foo';
				return errors;
			}, {} );
		} );

		const form = {
			name: 'alice',
			age: 30
		};

		return asyncValidate( form ).catch( errors => {
			expect( errors ).toEqual( {
				name: 'foo',
				age: 'foo'
			} );
		} );
	} );
} );

describe( 'getCallingCode', () => {
	it( 'should return an empty string when no country code provided', () => {
		expect( getCallingCode() ).toBe( '' );
	} );

	it( 'should return an empty string when country code is null', () => {
		expect( getCallingCode( null ) ).toBe( '' );
	} );

	it( 'should return an empty string when country code is empty', () => {
		expect( getCallingCode( '' ) ).toBe( '' );
	} );

	it( 'should return an empty string when country code is unknown', () => {
		expect( getCallingCode( 'BURGER' ) ).toBe( '' );
	} );

	it( 'should return an empty string when country code is unknown', () => {
		expect( getCallingCode( 'FR' ) ).toBe( '33' );
	} );

	it( 'should return an empty string when country code is unknown', () => {
		expect( getCallingCode( 'UK' ) ).toBe( '44' );
	} );
} );

describe( 'isCallingCode', () => {
	it( 'should return true for a number that is a calling code', () => {
		expect( isCallingCode( 1 ) ).toBeTruthy();
		expect( isCallingCode( 44 ) ).toBeTruthy();
	} );

	it( 'should return false for a number that is not a calling code', () => {
		expect( isCallingCode( 1337 ) ).toBeFalsy();
		expect( isCallingCode( 3141591337 ) ).toBeFalsy();
	} );
} );

describe( 'maskPhone', () => {
	it( 'should return a plus sign when no number provided', () => {
		expect( maskPhone() ).toBe( '+' );
	} );

	it( 'should return a plus sign when number is null', () => {
		expect( maskPhone( null ) ).toBe( '+' );
	} );

	it( 'should return a plus sign when number is empty', () => {
		expect( maskPhone( '' ) ).toBe( '+' );
	} );

	it( 'should return an empty string when deleting a single plus sign', () => {
		expect( maskPhone( '', '+' ) ).toBe( '' );
	} );

	it( 'should return a plus sign when deleting a single digit', () => {
		expect( maskPhone( '', '1' ) ).toBe( '+' );
	} );

	it( 'should return a plus sign when number only contains invisible characters', () => {
		expect( maskPhone( ' 	' ) ).toBe( '+' );
	} );

	it( 'should add a plus sign to a single digit', () => {
		expect( maskPhone( '1' ) ).toBe( '+1' );
	} );

	it( 'should add a plus sign to a full number', () => {
		expect( maskPhone( '1234567890' ) ).toBe( '+1234567890' );
	} );

	it( 'should trim any invisible characters', () => {
		expect( maskPhone( ' +1 234 567 890   ' ) ).toBe( '+1234567890' );
	} );

	it( 'should not remove periods', () => {
		expect( maskPhone( '12.34.56.78.90' ) ).toBe( '+12.34.56.78.90' );
	} );

	it( 'should remove any invalid character', () => {
		expect( maskPhone( '+1 (234) 567-890' ) ).toBe( '+1234567890' );
	} );

	it( 'should remove any duplicate plus sign', () => {
		expect( maskPhone( '++1234567890' ) ).toBe( '+1234567890' );
	} );
} );

describe( 'validateEmail', () => {
	it( 'should match valid email addresses', () => {
		expect( validateEmail( 'thisisavalidemail@domain.com' ) ).toBeNull();
		expect( validateEmail( 'this-is+a-valid-email@dom-ain.co.uk' ) ).toBeNull();
		expect( validateEmail( 'this-is+a-valid-email@domain' ) ).toBeNull();
	} );

	it( 'should not match invalid email addresses', () => {
		expect( validateEmail( undefined ) ).not.toBeNull();
		expect( validateEmail( null ) ).not.toBeNull();
		expect( validateEmail( false ) ).not.toBeNull();
		expect( validateEmail( 'thisisaninvalidemail' ) ).not.toBeNull();
		expect( validateEmail( 'this is an invalid email@domain' ) ).not.toBeNull();
	} );
} );
