// External dependencies
import { connect } from 'react-redux';

// Internal dependencies
import { checkDomainAvailability } from 'actions/domain-availability';
import {
	getDomainAvailability,
	hasDomainAvailabilityLoaded,
	isDomainAvailabilityRequesting,
	isDomainAvailabilityRequestingOtherDomain,
} from 'reducers/domain-availability/selectors';
import { recordTracksEvent, withAnalytics } from 'actions/analytics';
import Suggestion from 'components/ui/search/suggestion';

export default connect(
	( state, ownProps ) => ( {
		isAvailable: getDomainAvailability( state, ownProps.suggestion.domainName ),
		isRequestingAvailability: isDomainAvailabilityRequesting( state, ownProps.suggestion.domainName ),
		isRequestingAvailabilityForOtherDomain: isDomainAvailabilityRequestingOtherDomain( state, ownProps.suggestion.domainName ),
		hasLoadedAvailability: hasDomainAvailabilityLoaded( state, ownProps.suggestion.domainName )
	} ),
	{
		checkDomainAvailability: withAnalytics(
			( { isPremium, relevance } ) => recordTracksEvent( 'delphin_domain_availability_check', {
				is_premium: isPremium,
				relevance
			} ),
			checkDomainAvailability
		)
	}
)( Suggestion );
