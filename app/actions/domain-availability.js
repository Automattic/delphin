// Internal dependencies
import {
	WPCOM_REQUEST,
	DOMAIN_AVAILABILITY_FETCH,
	DOMAIN_AVAILABILITY_FETCH_COMPLETE,
	DOMAIN_AVAILABILITY_FETCH_FAIL,
} from 'reducers/action-types';

export function checkDomainAvailability( { domainName } ) {
	return {
		type: WPCOM_REQUEST,
		method: 'get',
		params: {
			apiNamespace: 'wpcom/v2',
			path: '/delphin/domain/' + domainName + '/availability'
		},
		loading: () => ( { type: DOMAIN_AVAILABILITY_FETCH, domainName } ),
		success: ( results ) => ( {
			type: DOMAIN_AVAILABILITY_FETCH_COMPLETE,
			domainName,
			results
		} ),
		fail: {
			type: DOMAIN_AVAILABILITY_FETCH_FAIL,
			domainName
		}
	};
}
