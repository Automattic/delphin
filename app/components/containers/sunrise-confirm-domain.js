// External dependencies
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Internal dependencies
import { getSelectedDomain, getSelectedDomainCost, getSelectedDomainApplicationCost, hasSelectedDomain } from 'reducers/checkout/selectors';
import { isLoggedIn } from 'reducers/user/selectors';
import { redirect } from 'actions/routes';
import SunriseConfirmDomain from 'components/ui/sunrise-confirm-domain';
import { recordTracksEvent } from 'actions/analytics';

export default connect(
	state => ( {
		applicationCost: getSelectedDomainApplicationCost( state ),
		domain: getSelectedDomain( state ),
		domainCost: getSelectedDomainCost( state ),
		hasSelectedDomain: hasSelectedDomain( state ),
		isLoggedIn: isLoggedIn( state )
	} ),
	dispatch => bindActionCreators( {
		redirect,
		trackSubmit: ( isPremium ) => recordTracksEvent( 'delphin_select_domain', { is_premium: isPremium } )
	}, dispatch )
)( SunriseConfirmDomain );
