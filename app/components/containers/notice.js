// External dependencies
import { connect } from 'react-redux';

// Internal dependencies
import { removeNotice } from 'actions';
import Notice from 'components/ui/notices/notice';

export default connect(
	null,
	( dispatch, { notice } ) => {
		return {
			removeNotice() {
				dispatch( removeNotice( notice ) );
			}
		};
	}
)( Notice );
