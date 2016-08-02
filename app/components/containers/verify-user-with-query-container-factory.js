// External dependencies
import { bindActionCreators } from 'redux';
import capitalize from 'lodash/capitalize';
import { connect } from 'react-redux';

// Internal dependencies
import { addNotice } from 'actions/notices';
import { getPath } from 'routes';
import { recordPageView } from 'actions/analytics';
import { redirect } from 'actions/routes';
import { fetchDomainPrice } from 'actions/domain-price';
import { selectDomain } from 'actions/domain-search';
import { verifyUser } from 'actions/user';
import VerifyUserWithQuery from 'components/ui/connect-user/verify-user-with-query';

export const verifyUserWithQueryContainerFactory = intention => connect(
	( state, ownProps ) => ( {
		intention,
		query: ownProps.location.query
	} ),
	dispatch => bindActionCreators( {
		addNotice,
		fetchDomainPrice,
		recordPageView,
		redirect,
		selectDomain,
		verifyUser
	}, dispatch ),
	( stateProps, dispatchProps, ownProps ) => Object.assign( {}, stateProps, dispatchProps, ownProps, {
		recordPageView() {
			let slug = 'signUpWithEmail';

			if ( intention === 'login' ) {
				slug = 'signInWithEmail';
			}

			dispatchProps.recordPageView( getPath( slug ), `Verify User With Query (${ capitalize( intention ) })` );
		}
	} )
)( VerifyUserWithQuery );
