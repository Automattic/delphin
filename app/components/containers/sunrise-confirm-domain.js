// External dependencies
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Internal dependencies
import { getSelectedDomain, getSelectedDomainCost, getSelectedDomainApplicationCost, hasSelectedDomain } from 'reducers/checkout/selectors';
import { isLoggedIn } from 'reducers/user/selectors';
import { redirect } from 'actions/routes';
import SunriseConfirmDomain from 'components/ui/sunrise-confirm-domain';

export default connect(
	state => ( {
		applicationCost: getSelectedDomainApplicationCost( state ),
		domain: getSelectedDomain( state ),
		domainCost: getSelectedDomainCost( state ),
		hasSelectedDomain: hasSelectedDomain( state ),
		isLoggedIn: isLoggedIn( state )
	} ),
	dispatch => bindActionCreators( {
		redirect
	}, dispatch )
)( SunriseConfirmDomain );
