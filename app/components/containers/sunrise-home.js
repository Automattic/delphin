// External dependencies
import { reduxForm } from 'redux-form';
import { push } from 'react-router-redux';

// Internal dependencies
import { getPath } from 'routes';
import SunriseHome from 'components/ui/sunrise-home';
import flowStep from 'components/containers/flow-step';

export default reduxForm(
	{
		form: 'sunrise-home',
		fields: [ 'query' ]
	},
	undefined,
	dispatch => ( {
		redirectToConfirmDomain() {
			dispatch( push( getPath( 'confirmDomain' ) ) );
		}
	} )
)( flowStep( SunriseHome, 'pre-registration' ) );
