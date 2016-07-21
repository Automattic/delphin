// External dependencies
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Internal dependencies
import { getCheckout } from 'reducers/checkout/selectors';
import { redirect } from 'actions/routes';
import SunriseConfirmDomain from 'components/ui/sunrise-confirm-domain';

export default connect(
	state => ( { domain: getCheckout( state ).selectedDomain.domain } ),
	dispatch => bindActionCreators( {
		redirect
	}, dispatch )
)( SunriseConfirmDomain );
