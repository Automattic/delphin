// External dependencies
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Internal dependencies
import { destroySetupForms } from 'actions/setup';
import { fetchMyDomains } from 'actions/my-domains';
import { getSelectedDomain, hasSelectedDomain } from 'reducers/checkout/selectors';
import { getUserSettings, isLoggedIn } from 'reducers/user/selectors';
import Success from 'components/ui/success';
import { redirect } from 'actions/routes';

export default connect(
	state => ( {
		domain: getSelectedDomain( state ).domainName,
		email: ( hasSelectedDomain( state ) && isLoggedIn( state ) )
			? getUserSettings( state ).data.email
			: null,
		hasSelectedDomain: hasSelectedDomain( state ),
	} ),
	dispatch => bindActionCreators( {
		destroySetupForms,
		fetchMyDomains,
		redirect
	}, dispatch )
)( Success );
