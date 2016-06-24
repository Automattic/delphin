jest.disableAutomock();

// Internal dependencies
import { getAsyncValidateFunction } from '..';

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
