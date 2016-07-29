// External dependencies
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Internal dependencies
import { fetchDomainPrice } from 'actions/domain-price';
import { getSelectedDomain } from 'reducers/checkout/selectors';
import { isLoggedIn } from 'reducers/user/selectors';
import { redirect } from 'actions/routes';
import SunriseConfirmDomain from 'components/ui/sunrise-confirm-domain';

export default connect(
	state => ( {
		domain: getSelectedDomain( state ).domain,
		isLoggedIn: isLoggedIn( state )
	} ),
	dispatch => bindActionCreators( {
		redirect,
		fetchDomainPrice
	}, dispatch ),
	( stateProps, dispatchProps ) => Object.assign( {}, stateProps, dispatchProps, {
		fetchDomainPrice() {
			return dispatchProps.fetchDomainPrice( stateProps.domain );
		}
	} )
)( SunriseConfirmDomain );
