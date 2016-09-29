// External dependencies
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Internal dependencies
import RequireLogin from './require-login';
import SetUpConnect from 'components/ui/set-up-connect';
import { redirect } from 'actions/routes';

export default connect(
	( state, ownProps ) => ( {
		domainName: ownProps.params.domainName,
		provider: ownProps.params.provider,
	} ),
	dispatch => bindActionCreators( {
		redirect
	}, dispatch )
)( RequireLogin( SetUpConnect ) );
