// External dependencies
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

// Internal dependencies
import ContactInformation from 'components/ui/contact-information';
import { getPath } from 'routes';
import { getSelectedDomain, hasSelectedDomain } from 'reducers/checkout/selectors';
import { hasDomainTrademarkClaim } from 'reducers/domain-availability/selectors';
import RequireSignup from 'components/containers/require-signup';
import { validateContactInformation } from 'actions/contact-information';
import { withAnalytics, recordTracksEvent } from 'actions/analytics';

export default connect(
	state => ( {
		domain: getSelectedDomain( state ),
		hasSelectedDomain: hasSelectedDomain( state ),
		hasTrademarkClaim: hasDomainTrademarkClaim( state, getSelectedDomain( state ).domainName ),
	} ),
	dispatch => (
		bindActionCreators( {
			redirectToCheckout: withAnalytics(
				recordTracksEvent( 'delphin_contact_form_submit' ),
				() => push( getPath( 'checkout' ) )
			),
			redirectToHome: () => push( getPath( 'home' ) ),
			validateContactInformation: ( domainName, contactInformation ) =>
				validateContactInformation( [ domainName ], contactInformation )
		}, dispatch )
	)
)( RequireSignup( ContactInformation, getPath( 'contactInformation' ) ) );
