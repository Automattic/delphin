// External dependencies
import { reduxForm } from 'redux-form';

// Internal dependencies
import Home from 'components/ui/home';

export default reduxForm(
	{
		form: 'search',
		fields: [ 'query' ]
	}
)( Home );
