// External dependencies
import { connect } from 'react-redux';

// Internal dependencies
import { getSelectedDomain } from 'reducers/checkout/selectors';
import { getUserSettings } from 'reducers/user/selectors';
import Success from 'components/ui/success';

export default connect(
	state => ( {
		domain: getSelectedDomain( state ).domainName,
		email: getUserSettings( state ).data.email
	} )
)( Success );
