// External dependencies
import { connect } from 'react-redux';
import { recordTracksEvent, withAnalytics } from 'actions/analytics';

// Internal dependencies
import Keyword from 'components/ui/search-input/keyword';
import {
	domainSearchKeywordRemove,
} from 'actions/domain-search';

export default connect(
	undefined,
	{
		remove: withAnalytics(
			keyword => recordTracksEvent( 'delphin_keyword_remove', { keyword: keyword } ),
			domainSearchKeywordRemove
		),
	}
)( Keyword );
