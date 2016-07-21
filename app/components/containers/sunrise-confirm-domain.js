// External dependencies
import { connect } from 'react-redux';

// Internal dependencies
import SunriseConfirmDomain from 'components/ui/sunrise-confirm-domain';
import flowStep from 'components/containers/flow-step';

export default connect(
	() => ( { domain: 'danhauk.blog' } )
)( flowStep( SunriseConfirmDomain ) );
