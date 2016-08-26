// External dependencies
import { connect } from 'react-redux';

// Internal dependencies
import SearchInput from 'components/ui/search-input';
import {
	domainSearchInputFocus,
	domainSearchKeywordReplaceSelected,
	domainSearchLastKeywordRemove,
	domainSearchInputChange,
	domainSearchSubmit,
} from 'actions/domain-search';
import {
	getInputValue,
	getSelectedKeyword,
	getKeywords,
	getRelatedWords,
} from 'reducers/ui/domain-search/selectors';

export default connect(
	state => ( {
		inputValue: getInputValue( state ),
		keywords: getKeywords( state ),
		relatedWords: getRelatedWords( state ),
		selectedKeyword: getSelectedKeyword( state )
	} ),
	dispatch => ( {
		onInputFocus() {
			dispatch( domainSearchInputFocus() );
		},
		removeLastKeyword() {
			dispatch( domainSearchLastKeywordRemove() );
		},
		submit() {
			dispatch( domainSearchSubmit() );
		},
		changeInput( value ) {
			dispatch( domainSearchInputChange( value ) );
		},
		replace( value ) {
			dispatch( domainSearchKeywordReplaceSelected( value ) );
		}
	} )
)( SearchInput );
