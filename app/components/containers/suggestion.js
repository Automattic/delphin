// External dependencies
import { connect } from 'react-redux';

// Internal dependencies
import { checkDomainAvailability } from 'actions/domain-availability';
import { getDomainAvailability, getDomainAvailabilityHasLoaded, getDomainAvailabilityIsRequesting } from 'reducers/domain-availability/selectors';
import { recordTracksEvent } from 'actions/analytics';
import Suggestion from 'components/ui/search/suggestion';

export default connect(
	( state, ownProps ) => ( {
		isAvailable: getDomainAvailability( state, ownProps.suggestion.domainName ),
		isRequestingAvailability: getDomainAvailabilityIsRequesting( state, ownProps.suggestion.domainName ),
		hasLoadedAvailability: getDomainAvailabilityHasLoaded( state, ownProps.suggestion.domainName )
	} ),
	( dispatch ) => ( {
		checkDomainAvailability( domainProduct ) {
			dispatch( recordTracksEvent( 'delphin_domain_availability_check', {
				is_premium: domainProduct.isPremium,
				relevance: domainProduct.relevance
			} ) );

			dispatch( checkDomainAvailability( domainProduct ) );
		}
	} )
)( Suggestion );
