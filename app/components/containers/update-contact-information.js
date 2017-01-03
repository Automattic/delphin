// External dependencies
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

// Internal dependencies
import UpdateContactInformation from 'components/ui/update-contact-information';
import { getPath } from 'routes';
import RequireLogin from 'components/containers/require-login';
import { validateContactInformation, updateContactInformation } from 'actions/contact-information';
import { withAnalytics, recordTracksEvent } from 'actions/analytics';
import { fetchMyDomains } from 'actions/my-domains';

export default connect(
	state => ( {
		domains: state.user.myDomains,
	} ),
	dispatch => (
		bindActionCreators( {
			// redirectToCheckout: withAnalytics(
			// 	recordTracksEvent( 'delphin_contact_form_submit' ),
			// 	() => push( getPath( 'checkout' ) )
			// ),
			updateContactInformation,
			redirectToHome: () => push( getPath( 'home' ) ),
			validateContactInformation,
			fetchMyDomains,
		}, dispatch )
	)
)( RequireLogin( UpdateContactInformation, getPath( 'contactInformation' ) ) );
