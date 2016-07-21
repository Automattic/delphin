// External dependencies
import { connect } from 'react-redux';

// Internal dependencies
import { getCheckout } from 'reducers/checkout/selectors';
import { getUserSettings } from 'reducers/user/selectors';
import SunriseSuccess from 'components/ui/sunrise-success';

export default connect(
	state => ( {
		domain: getCheckout( state ).selectedDomain.domain,
		email: getUserSettings( state ).data.email
	} )
)( SunriseSuccess );
