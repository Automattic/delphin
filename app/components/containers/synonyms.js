// External dependencies
import { connect } from 'react-redux';

// Internal dependencies
import Synonyms from 'components/ui/search-input/synonyms';
import {
	domainSearchKeywordReplaceSelected,
} from 'actions/domain-search';
import {
	getSelectedKeyword,
} from 'reducers/ui/domain-search/selectors';

export default connect(
	state => ( {
		target: getSelectedKeyword( state )
	} ),
	dispatch => ( {
		replace( value ) {
			dispatch( domainSearchKeywordReplaceSelected( value ) );
		}
	} )
)( Synonyms );

