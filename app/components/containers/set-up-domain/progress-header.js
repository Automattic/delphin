// External dependencies
import { connect } from 'react-redux';

// Internal dependencies
import ProgressHeader from 'components/ui/set-up-domain/progress-header';
import { redirect } from 'actions/routes';

export default connect(
	( state, { progress } ) => ( {
		progress
	} ),
	{ handleOnExitClick: () => redirect( 'myDomains' ) }
)( ProgressHeader );
