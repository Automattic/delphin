// External dependencies
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Internal dependencies
import { fetchDomainPrice } from 'actions/domain-price';
import { withAnalytics, recordTracksEvent } from 'actions/analytics';
import { getSelectedDomain, getSelectedDomainCost, getSelectedDomainApplicationCost, hasSelectedDomain } from 'reducers/checkout/selectors';
import { isLoggedIn } from 'reducers/user/selectors';
import { redirect } from 'actions/routes';
import { selectDomain, unselectDomain } from 'actions/domain-search';
import SunriseConfirmDomain from 'components/ui/sunrise-confirm-domain';

export default connect(
	( state, ownProps ) => ( {
		applicationCost: getSelectedDomainApplicationCost( state ),
		domain: getSelectedDomain( state ),
		domainCost: getSelectedDomainCost( state ),
		hasSelectedDomain: hasSelectedDomain( state ),
		isLoggedIn: isLoggedIn( state ),
		query: ownProps.location.query.query
	} ),
	dispatch => bindActionCreators( {
		fetchDomainPrice: withAnalytics(
			domain => recordTracksEvent( 'delphin_domain_search', { search_string: domain } ),
			fetchDomainPrice
		),
		redirect,
		selectDomain,
		trackSubmit: ( isPremium ) => recordTracksEvent( 'delphin_select_domain', { is_premium: isPremium } ),
		unselectDomain
	}, dispatch )
)( SunriseConfirmDomain );
