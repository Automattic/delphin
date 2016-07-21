// External dependencies
import { connect } from 'react-redux';

// Internal dependencies
import SunriseConfirmDomain from 'components/ui/sunrise-confirm-domain';

export default connect(
	() => ( { domain: 'danhauk.blog' } )
)( SunriseConfirmDomain );
