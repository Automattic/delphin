// External dependencies
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { recordTracksEvent, withAnalytics } from 'actions/analytics';

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
	( dispatch, ownProps ) => bindActionCreators( {
		replace: withAnalytics(
			newKeyword => recordTracksEvent( 'delphin_synonym_select', {
				old_keyword: ownProps.keyword.value,
				new_keyword: newKeyword
			} ),
			domainSearchKeywordReplaceSelected
		),

		remove: withAnalytics(
			keyword => recordTracksEvent( 'delphin_keyword_remove', { keyword: keyword } ),
			domainSearchKeywordRemove
		),
		toggleSelect: keyword => {
			if ( keyword.isSelected ) {
				return deselectKeyword();
			}
			return selectKeyword( keyword );
		}
	}, dispatch )
)( Keyword );
