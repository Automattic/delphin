// External dependencies
import { bindActionCreators } from 'redux';
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
	dispatch => bindActionCreators( {
		onInputFocus: domainSearchInputFocus,
		removeLastKeyword: domainSearchLastKeywordRemove,
		submit: domainSearchSubmit,
		changeInput: domainSearchInputChange,
		replace: domainSearchKeywordReplaceSelected,
	}, dispatch )
)( SearchInput );
