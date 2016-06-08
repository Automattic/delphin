// External dependencies
import { startAsyncValidation, stopAsyncValidation } from 'redux-form';

// Internal dependencies
import { addNotice } from 'actions/notices';
import {
	CONTACT_INFORMATION_FETCH,
	CONTACT_INFORMATION_FETCH_COMPLETE,
	WPCOM_REQUEST
} from 'reducers/action-types';
import { normalizeValidationErrors } from 'lib/contact-information';
import { snakeify } from 'lib/formatters';

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
		payload: snakeify( { domainNames, contactInformation } ),
		loading: () => {
			return dispatch => {
				dispatch( startAsyncValidation( 'contact-information' ) );
			};
		},
		success: data => {
			return dispatch => {
				const { success, messages } = data,
					errors = ! success ? normalizeValidationErrors( messages ) : undefined;

				dispatch( stopAsyncValidation( 'contact-information', errors ) );
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
