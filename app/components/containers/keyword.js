// External dependencies
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Internal dependencies
import Keyword from 'components/ui/search-input/keyword';
import { getRelatedWords } from 'reducers/ui/domain-search/selectors';
import {
	domainSearchKeywordRemove,
	selectKeyword,
	deselectKeyword,
	domainSearchKeywordReplaceSelected,
} from 'actions/domain-search';

export default connect(
	state => ( {
		relatedWords: getRelatedWords( state ),
	} ),
	dispatch => bindActionCreators( {
		replace: domainSearchKeywordReplaceSelected,
		remove: domainSearchKeywordRemove,
		toggleSelect: keyword => {
			if ( keyword.isSelected ) {
				return deselectKeyword();
			}
			return selectKeyword( keyword );
		}
	}, dispatch )
)( Keyword );
