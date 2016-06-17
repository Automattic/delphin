// Internal dependencies
import {
	MY_DOMAINS_DETAILS_SHOW,
	MY_DOMAINS_DETAILS_HIDE
} from 'reducers/action-types';

export const showDomainDetails = ( domainName ) => ( { type: MY_DOMAINS_DETAILS_SHOW, domainName } );
export const hideDomainDetails = ( domainName ) => ( { type: MY_DOMAINS_DETAILS_HIDE, domainName } );
