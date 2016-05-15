// External dependencies
import { connect } from 'react-redux';

// Internal dependencies
import Keywords from 'components/ui/search-input/keywords';
import {
	getKeywords
} from 'reducers/ui/domain-search/selectors';

export default connect(
	state => ( {
		keywords: getKeywords( state )
	} )
)( Keywords );
