// External dependencies
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

// Internal dependencies
import UpdateContactInformation from 'components/ui/update-contact-information';
import { getPath } from 'routes';
import RequireLogin from 'components/containers/require-login';
import { validateContactInformation, updateContactInformation } from 'actions/contact-information';
import { addNotice } from 'actions/notices';
import { fetchMyDomains } from 'actions/my-domains';

export default connect(
	state => ( {
		domains: state.user.myDomains,
	} ),
	dispatch => (
		bindActionCreators( {
			addNotice,
			updateContactInformation,
			redirectToMyDomains: () => push( getPath( 'myDomains' ) ),
			validateContactInformation,
			fetchMyDomains,
		}, dispatch )
	)
)( RequireLogin( UpdateContactInformation, getPath( 'contactInformation' ) ) );
