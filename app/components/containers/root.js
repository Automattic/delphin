// External dependencies
import { connect } from 'react-redux';

// Internal dependencies
import { clearNotice } from 'actions';
import Root from 'components/ui/root';

export default connect(
	state => ( { notices: state.notices } ),
	dispatch => {
		return {
			clearNotice: notice => {
				dispatch( clearNotice( notice ) );
			}
		};
	}
)( Root );
