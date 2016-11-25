// External dependencies
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Internal dependencies
import { destroySetupForms } from 'actions/setup';
import { fetchMyDomains } from 'actions/my-domains';
import MyDomains from 'components/ui/my-domains';
import RequireLogin from 'components/containers/require-login';

export default connect(
	state => ( {
		domains: state.user.myDomains,
	} ),
	dispatch => (
		bindActionCreators( {
			destroySetupForms,
			fetchMyDomains
		}, dispatch )
	)
)( RequireLogin( MyDomains ) );
