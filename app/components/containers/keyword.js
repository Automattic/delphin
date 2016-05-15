// External dependencies
import { connect } from 'react-redux';

// Internal dependencies
import Keyword from 'components/ui/search-input/keyword';
import {
	domainSearchKeywordRemove,
	selectKeyword,
	deselectKeyword
} from 'actions/domain-search';

export default connect(
	undefined,
	dispatch => ( {
		remove( keyword ) {
			dispatch( domainSearchKeywordRemove( keyword.value ) );
		},
		toggleSelect( keyword ) {
			if ( keyword.isSelected ) {
				dispatch( deselectKeyword() );
			} else {
				dispatch( selectKeyword( keyword.value ) );
			}
		}
	} )
)( Keyword );
