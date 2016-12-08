// External dependencies
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Internal dependencies
import { checkDomainAvailability } from 'actions/domain-availability';
import { destroySetupForms } from 'actions/setup';
import { fetchMyDomains } from 'actions/my-domains';
import { getSelectedDomain } from 'reducers/checkout/selectors';
import { hasDomainTrademarkClaim } from 'reducers/domain-availability/selectors';
import { hasDomainAvailabilityLoaded } from 'reducers/domain-availability/selectors';
import RequireLogin from 'components/containers/require-login';
import Success from 'components/ui/success';

export default connect(
	state => {
		const domainName = getSelectedDomain( state ).domainName;

		return {
			domain: domainName,
			hasTrademarkClaim: hasDomainTrademarkClaim( state, domainName ),
			hasDomainAvailabilityLoaded: hasDomainAvailabilityLoaded( state, domainName ),
		};
	},
	dispatch => bindActionCreators( {
		checkDomainAvailability,
		destroySetupForms,
		fetchMyDomains
	}, dispatch ),
	( stateProps, dispatchProps, ownProps ) => Object.assign( {}, stateProps, dispatchProps, ownProps, {
		checkDomainAvailability() {
			dispatchProps.checkDomainAvailability( { domainName: stateProps.domain } );
		}
	} )
)( RequireLogin( Success ) );
