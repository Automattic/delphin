// Internal dependencies
import {
	NAMESERVERS_UPDATE,
	NAMESERVERS_UPDATE_COMPLETE,
	NAMESERVERS_UPDATE_FAIL,
	WPCOM_REQUEST,
} from 'reducers/action-types';

export const updateNameservers = ( domain, nameservers ) => ( {
	type: WPCOM_REQUEST,
	method: 'post',
	params: {
		apiNamespace: 'wpcom/v2',
		path: '/delphin/domain/' + domain
	},
	payload: { service_slug: 'custom', nameservers },
	loading: { type: NAMESERVERS_UPDATE },
	success: { type: NAMESERVERS_UPDATE_COMPLETE },
	fail: { type: NAMESERVERS_UPDATE_FAIL }
} );
