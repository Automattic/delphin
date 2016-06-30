// External dependencies
import { connect } from 'react-redux';

// Internal dependencies
import About from 'components/ui/about';
import { updatePageTitle } from 'actions/page';

export default connect(
	null,
	{ updatePageTitle }
)( About );
