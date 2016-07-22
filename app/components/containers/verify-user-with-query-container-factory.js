// External dependencies
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Internal dependencies
import { addNotice } from 'actions/notices';
import { redirect } from 'actions/routes';
import { verifyUser } from 'actions/user';
import VerifyUserWithQuery from 'components/ui/connect-user/verify-user-with-query';

export const verifyUserWithQueryContainerFactory = intention => connect(
	( state, ownProps ) => ( {
		intention,
		query: ownProps.location.query
	} ),
	dispatch => bindActionCreators( {
		addNotice,
		redirect,
		verifyUser
	}, dispatch )
)( VerifyUserWithQuery );
