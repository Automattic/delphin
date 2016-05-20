// External dependencies
import { connect } from 'react-redux';

// Internal dependencies
import SearchInput from 'components/ui/search-input';
import {
	domainSearchKeywordReplaceSelected,
	domainSearchLastKeywordRemove,
	domainSearchInputChange,
	domainSearchSubmit
} from 'actions/domain-search';
import {
	getInputValue,
	getSelectedKeyword,
	getKeywords
} from 'reducers/ui/domain-search/selectors';

export default connect(
	state => ( {
		inputValue: getInputValue( state ),
		keywords: getKeywords( state ),
		selectedKeyword: getSelectedKeyword( state )
	} ),
	dispatch => ( {
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
