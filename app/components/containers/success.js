// External dependencies
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Internal dependencies
import { destroySetupForms } from 'actions/setup';
import { fetchMyDomains } from 'actions/my-domains';
import { getSelectedDomain } from 'reducers/checkout/selectors';
import RequireLogin from 'components/containers/require-login';
import Success from 'components/ui/success';

export default connect(
	state => ( {
		domain: getSelectedDomain( state ).domainName
	} ),
	dispatch => bindActionCreators( {
		destroySetupForms,
		fetchMyDomains
	}, dispatch )
)( RequireLogin( Success ) );
