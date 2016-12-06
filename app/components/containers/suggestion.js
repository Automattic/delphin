// External dependencies
import { connect } from 'react-redux';

// Internal dependencies
import { checkDomainAvailability } from 'actions/domain-availability';
import {
	getDomainAvailability,
	hasDomainAvailabilityLoaded,
	hasDomainTrademarkClaim,
	isDomainAvailabilityRequesting,
	isDomainAvailabilityRequestingOtherDomain,
} from 'reducers/domain-availability/selectors';
import { recordTracksEvent, withAnalytics } from 'actions/analytics';
import { redirect } from 'actions/routes';
import Suggestion from 'components/ui/search/suggestion';

export default connect(
	( state, { suggestion: { domainName } } ) => ( {
		hasTrademarkClaim: hasDomainTrademarkClaim( state, domainName ),
		isAvailable: getDomainAvailability( state, domainName ),
		isRequestingAvailability: isDomainAvailabilityRequesting( state, domainName ),
		isRequestingAvailabilityForOtherDomain: isDomainAvailabilityRequestingOtherDomain( state, domainName ),
		hasLoadedAvailability: hasDomainAvailabilityLoaded( state, domainName )
	} ),
	{
		checkDomainAvailability: withAnalytics(
			( { isPremium, relevance } ) => recordTracksEvent( 'delphin_domain_availability_check', {
				is_premium: isPremium,
				relevance
			} ),
			checkDomainAvailability
		),
		redirect
	}
)( Suggestion );
