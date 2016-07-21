// External dependencies
import { connect } from 'react-redux';

// Internal dependencies
import { getCheckout } from 'reducers/checkout/selectors';
import SunriseConfirmDomain from 'components/ui/sunrise-confirm-domain';

export default connect(
	state => ( { domain: getCheckout( state ).selectedDomain.domain } )
)( SunriseConfirmDomain );
