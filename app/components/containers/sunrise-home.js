// External dependencies
import { reduxForm } from 'redux-form';

// Internal dependencies
import SunriseHome from 'components/ui/sunrise-home';

export default reduxForm(
	{
		form: 'sunrise-home',
		fields: [ 'query' ]
	}
)( SunriseHome );
