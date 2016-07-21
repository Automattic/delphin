// External dependencies
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

// Internal dependencies
import { getCheckout } from 'reducers/checkout/selectors';
import { getPath } from 'routes';
import SunriseConfirmDomain from 'components/ui/sunrise-confirm-domain';

export default connect(
	state => ( { domain: getCheckout( state ).selectedDomain.domain } ),
	dispatch => bindActionCreators( {
		redirect: pathSlug => push( getPath( pathSlug ) )
	}, dispatch )
)( SunriseConfirmDomain );
