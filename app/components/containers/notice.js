// External dependencies
import { connect } from 'react-redux';

// Internal dependencies
import { removeNotice } from 'actions/notices';
import Notice from 'components/ui/notices/notice';

export default connect(
	null,
	( dispatch, { notice } ) => ( {
		removeNotice() {
			dispatch( removeNotice( notice ) );
		}
	} )
)( Notice );
