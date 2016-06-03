// Internal dependencies
import { addNotice } from 'actions/notices';
import {
	CONTACT_INFORMATION_FETCH,
	CONTACT_INFORMATION_FETCH_COMPLETE,
	CONTACT_INFORMATION_VALIDATE,
	CONTACT_INFORMATION_VALIDATE_COMPLETE,
	CONTACT_INFORMATION_VALIDATE_FAIL,
	WPCOM_REQUEST
} from 'reducers/action-types';
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
		loading: CONTACT_INFORMATION_VALIDATE,
		success: ( data ) => {
			return dispatch => {
				const { success, messages } = data;

				if ( success ) {
					dispatch( {
						type: CONTACT_INFORMATION_VALIDATE_COMPLETE
					} );

					return;
				}

				// TODO: camelize the list of messages and process all fields

				if ( messages.postal_code ) {
					return Promise.reject( { postalCode: messages.postal_code.join( '\r\n' ) } );
				}
			};
		},
		fail: ( error ) => {
			return dispatch => {
				dispatch( {
					type: CONTACT_INFORMATION_VALIDATE_FAIL
				} );

				dispatch( addNotice( {
					message: error.message,
					status: 'error'
				} ) );

				return Promise.reject( error );
			};
		}
	};
}
