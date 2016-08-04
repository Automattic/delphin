// External dependencies
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Internal dependencies
import { getSelectedDomain } from 'reducers/checkout/selectors';
import { getUserSettings } from 'reducers/user/selectors';
import Success from 'components/ui/success';
import { recordTracksEvent } from 'actions/analytics';

export default connect(
	state => ( {
		domain: getSelectedDomain( state ).domainName,
		email: getUserSettings( state ).data.email
	} ),
	dispatch => bindActionCreators( {
		trackAuctionSignup: () => recordTracksEvent( 'delphin_thank_you_click' )
	}, dispatch )
)( Success );
