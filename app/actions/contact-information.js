// External dependencies
import camelCase from 'lodash/camelCase';
import { startAsyncValidation, stopAsyncValidation } from 'redux-form';

// Internal dependencies
import { addNotice } from 'actions/notices';
import {
	CONTACT_INFORMATION_FETCH,
	CONTACT_INFORMATION_FETCH_COMPLETE,
	WPCOM_REQUEST
} from 'reducers/action-types';
import { snakeifyKeys } from 'lib/formatters';

export const fetchContactInformation = () => ( {
	type: WPCOM_REQUEST,
	method: 'get',
	params: { path: '/me/domain-contact-information' },
	loading: { type: CONTACT_INFORMATION_FETCH },
	success: data => ( {
		type: CONTACT_INFORMATION_FETCH_COMPLETE,
		data
	} )
} );

/**
 * Validates the specified contact information.
 *
 * @param {array} domainNames - list of domain names to validate the contact information against
 * @param {object} contactInformation - user's contact information
 * @returns {object} - the corresponding action object
 */
export function validateContactInformation( domainNames, contactInformation ) {
	return {
		type: WPCOM_REQUEST,
		method: 'post',
		params: { path: '/me/domain-contact-information/validate' },
		payload: snakeifyKeys( { domainNames, contactInformation } ),
		loading: () => {
			return dispatch => {
				dispatch( startAsyncValidation( 'contactInformation' ) );
			};
		},
		success: data => {
			return dispatch => {
				const { success, messages } = data;
				let errors;

				if ( ! success ) {
					errors = Object.keys( messages ).reduce( ( result, fieldName ) => {
						// redux-form only allows objects or strings as error values, so we nest the array of errors
						// under an arbitrary `data` property.
						result[ camelCase( fieldName ) ] = { data: messages[ fieldName ] };

						return result;
					}, {} );
				}

				dispatch( stopAsyncValidation( 'contactInformation', errors ) );
			};
		},
		fail: ( error ) => {
			return dispatch => {
				dispatch( addNotice( {
					message: error.message,
					status: 'error'
				} ) );

				return Promise.reject( error );
			};
		}
	};
}
