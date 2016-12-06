// External dependencies
import { connect } from 'react-redux';

// Internal dependencies
import { selectDomain } from 'actions/domain-search';
import { fetchDomainPrice } from 'actions/domain-price';
import { checkDomainAvailability } from 'actions/domain-availability';
import {
	getDomainAvailability,
	hasDomainAvailabilityLoaded,
	hasDomainTrademarkClaim,
	isDomainAvailabilityRequesting,
} from 'reducers/domain-availability/selectors';
import ConfirmTrademark from 'app/components/ui/confirm-trademark';
import { redirect } from 'actions/routes';
import { getSelectedDomain, hasSelectedDomain } from 'reducers/checkout/selectors';

export default connect(
	( state, ownProps ) => ( {
		domainName: ownProps.params.domainName,
		hasTrademarkClaim: hasDomainTrademarkClaim( state, ownProps.params.domainName ),
		isAvailable: getDomainAvailability( state, ownProps.params.domainName ),
		isRequestingAvailability: isDomainAvailabilityRequesting( state, ownProps.params.domainName ),
		hasSelectedDomain: hasSelectedDomain( state ),
		selectedDomain: getSelectedDomain( state ),
		hasLoadedAvailability: hasDomainAvailabilityLoaded( state, ownProps.params.domainName )
	} ),
	{
		checkDomainAvailability,
		redirect,
		fetchDomainPrice,
		selectDomain
	}
)( ConfirmTrademark );
