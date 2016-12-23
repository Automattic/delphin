// External dependencies
import { connect } from 'react-redux';

// Internal dependencies
import SearchInput from 'components/ui/search-input';
import {
	domainSearchLastKeywordRemove,
	domainSearchInputChange,
	domainSearchSubmit,
} from 'actions/domain-search';
import {
	getInputValue,
	getKeywords,
} from 'reducers/ui/domain-search/selectors';

export default connect(
	state => ( {
		inputValue: getInputValue( state ),
		keywords: getKeywords( state ),
	} ),
	{
		removeLastKeyword: domainSearchLastKeywordRemove,
		submit: domainSearchSubmit,
		changeInput: domainSearchInputChange,
	}
)( SearchInput );
