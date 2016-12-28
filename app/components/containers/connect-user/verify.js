// External dependencies
import { bindActionCreators } from 'redux';
import capitalize from 'lodash/capitalize';
import { change, reduxForm } from 'redux-form';
import { push } from 'react-router-redux';

// Internal dependencies
import { addNotice } from 'actions/notices';
import { connectUser, connectUserComplete, verifyUser, clearConnectUser } from 'actions/user';
import { getAsyncValidateFunction } from 'lib/form';
import { getSelectedDomain, hasSelectedDomain } from 'reducers/checkout/selectors';
import { getPath } from 'routes';
import { getUserConnect, isLoggedIn } from 'reducers/user/selectors';
import { fetchDomainPrice } from 'actions/domain-price';
import { recordPageView } from 'actions/analytics';
import { redirect } from 'actions/routes';
import { selectDomain } from 'actions/domain-search';
import i18n from 'i18n-calypso';
import VerifyUser from 'components/ui/connect-user/verify-user';
import { withAnalytics, recordTracksEvent } from 'actions/analytics';
import { showToggle } from 'actions/ui/toggle';
import { getToggle } from 'reducers/ui/toggle/selectors';
import { getLastLocationBeforeAuth } from 'reducers/history/selectors';

const validate = values => {
	const errors = {};
	if ( ! values.code || ! /^[0-9]{6}$/i.test( values.code ) ) {
		errors.code = i18n.translate( 'Your code should be six digits.' );
	}

	if ( values.twoFactorAuthenticationCode !== undefined ) {
		if ( ! values.twoFactorAuthenticationCode || ! /^[0-9]{6,7}$/i.test( values.twoFactorAuthenticationCode ) ) {
			errors.twoFactorAuthenticationCode = i18n.translate( 'Your code should be six or seven digits.' );
		}
	}

	return errors;
};

export default reduxForm(
	{
		form: 'verifyUser',
		fields: [ 'code', 'twoFactorAuthenticationCode' ],
		asyncValidate: getAsyncValidateFunction( validate ),
	},
	( state, ownProps ) => ( {
		hasSelectedDomain: hasSelectedDomain( state ),
		domain: getSelectedDomain( state ),
		isConfirmationCodeVisible: getToggle( state, 'isConfirmationCodeVisible' ),
		isLoggedIn: isLoggedIn( state ),
		user: getUserConnect( state ),
		query: ownProps.location.query,
		lastLocationBeforeAuth: getLastLocationBeforeAuth( state )
	} ),
	( dispatch, ownProps ) => bindActionCreators( {
		addNotice,
		connectUser,
		connectUserComplete,
		fetchDomainPrice,
		redirectToTryWithDifferentEmail: withAnalytics( recordTracksEvent( 'delphin_try_different_email_click' ), () => thunkDispatch => {
			thunkDispatch( clearConnectUser() );
			thunkDispatch( redirect( 'signupUser' ) );
		} ),
		recordPageView,
		redirect,
		redirectToQueryParamUrl: () => push( ownProps.location.query.redirect_to ),
		redirectToLastLocationBeforeAuth: () => push( ownProps.lastLocationBeforeAuth ),
		selectDomain,
		showToggle,
		updateCode: code => change( 'verifyUser', 'code', code ),
		verifyUser: withAnalytics(
			( email, code, twoFactorAuthenticationCode, intention ) => recordTracksEvent( 'delphin_confirmation_code_submit', { is_existing_account: intention === 'login' } ),
			verifyUser
		)
	}, dispatch ),
	( stateProps, dispatchProps, ownProps ) => Object.assign( {}, stateProps, dispatchProps, ownProps, {
		recordPageView() {
			dispatchProps.recordPageView(
				getPath( 'verifyUser' ),
				`Verify User (${ capitalize( stateProps.user.intention ) })`
			);
		}
	} )
)( VerifyUser );
