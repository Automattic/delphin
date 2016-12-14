// Internal dependencies
import { normalizeDomain } from 'lib/domains';
import {
	NAMESERVERS_FETCH,
	NAMESERVERS_FETCH_COMPLETE,
	NAMESERVERS_FETCH_FAIL,
	NAMESERVERS_UPDATE,
	NAMESERVERS_UPDATE_COMPLETE,
	NAMESERVERS_UPDATE_FAIL,
	WPCOM_REQUEST,
} from 'reducers/action-types';

export const fetchNameservers = domain => ( {
	type: WPCOM_REQUEST,
	method: 'get',
	params: {
		apiNamespace: 'wpcom/v2',
		path: '/delphin/domain/' + domain
	},
	loading: { type: NAMESERVERS_FETCH },
	success: ( { nameservers } ) => ( { type: NAMESERVERS_FETCH_COMPLETE, nameservers } ),
	fail: { type: NAMESERVERS_FETCH_FAIL },
} );

export const updateNameservers = ( domain, nameservers ) => ( {
	type: WPCOM_REQUEST,
	method: 'post',
	params: {
		apiNamespace: 'wpcom/v2',
		path: '/delphin/domain/' + domain
	},
	payload: { service_slug: 'custom', nameservers: nameservers.map( normalizeDomain ) },
	loading: { type: NAMESERVERS_UPDATE },
	success: { type: NAMESERVERS_UPDATE_COMPLETE },
	fail: { type: NAMESERVERS_UPDATE_FAIL }
} );
