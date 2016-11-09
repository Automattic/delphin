// External dependencies
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getValues } from 'redux-form';
import { push } from 'react-router-redux';

// Internal dependencies
import CheckoutReview from 'components/ui/checkout-review';
import { purchaseDomain } from 'actions/checkout';
import { getPath } from 'routes';
import { isPurchasing, getSelectedDomain, getSelectedDomainCost } from 'reducers/checkout/selectors';
import RequireLogin from 'components/containers/require-login';
import { withAnalytics, recordTracksEvent } from 'actions/analytics';

export default connect(
	state => ( {
		renewCost: getSelectedDomainCost( state ),
		isPurchasing: isPurchasing( state ),
		checkout: getValues( state.form.checkout ),
		contactInformation: getValues( state.form.contactInformation ),
		selectedDomain: getSelectedDomain( state )
	} ),
	dispatch => bindActionCreators( {
		purchaseDomain: withAnalytics(
			recordTracksEvent( 'delphin_application_review_submit' ),
			purchaseDomain
		),
		redirect: pathSlug => push( getPath( pathSlug ) )
	}, dispatch )
)( RequireLogin( CheckoutReview ) );
