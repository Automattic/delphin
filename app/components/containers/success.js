// External dependencies
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Internal dependencies
import { getSelectedDomain, hasSelectedDomain } from 'reducers/checkout/selectors';
import { getUserSettings } from 'reducers/user/selectors';
import Success from 'components/ui/success';
import { recordTracksEvent } from 'actions/analytics';
import { redirect } from 'actions/routes';

export default connect(
	state => ( {
		domain: getSelectedDomain( state ).domainName,
		email: hasSelectedDomain( state ) ? getUserSettings( state ).data.email : null,
		hasSelectedDomain: hasSelectedDomain( state ),
	} ),
	dispatch => bindActionCreators( {
		redirect,
		trackAuctionSignup: () => recordTracksEvent( 'delphin_thank_you_click' )
	}, dispatch )
)( Success );
