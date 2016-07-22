// External dependencies
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Internal dependencies
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
		redirect
	}, dispatch )
)( SunriseConfirmDomain );
