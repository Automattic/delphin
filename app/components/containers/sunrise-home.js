// External dependencies
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import { push } from 'react-router-redux';

// Internal dependencies
import { getPath } from 'routes';
import { selectDomain } from 'actions/domain-search';
import SunriseHome from 'components/ui/sunrise-home';

export default reduxForm(
	{
		form: 'sunrise-home',
		fields: [ 'query' ]
	},
	undefined,
	dispatch => bindActionCreators( {
		selectDomain,
		redirectToConfirmDomain: () => push( getPath( 'confirmDomain' ) )
	}, dispatch )
)( SunriseHome );
