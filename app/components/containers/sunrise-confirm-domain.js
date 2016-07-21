// External dependencies
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

// Internal dependencies
import { getPath } from 'routes';
import SunriseConfirmDomain from 'components/ui/sunrise-confirm-domain';

export default connect(
	() => ( { domain: 'danhauk.blog' } ),
	dispatch => bindActionCreators( {
		redirect: pathSlug => push( getPath( pathSlug ) )
	}, dispatch )
)( SunriseConfirmDomain );
