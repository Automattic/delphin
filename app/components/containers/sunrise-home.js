// External dependencies
import i18n from 'i18n-calypso';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';

// Internal dependencies
import { getAsyncValidateFunction } from 'lib/form';
import { selectDomain } from 'actions/domain-search';
import SunriseHome from 'components/ui/sunrise-home';
import { redirect } from 'actions/routes';

const validate = values => {
	const query = values.q;

	// any query with some alphanumeric characters is valid
	if ( ! query || ! query.replace( /\W+/g, '' ) ) {
		return { q: i18n.translate( 'Please enter some search terms.' ) };
	}

	return {};
};

export default reduxForm(
	{
		form: 'sunrise-home',
		fields: [ 'q' ],
		asyncValidate: getAsyncValidateFunction( validate )
	},
	undefined,
	dispatch => bindActionCreators( {
		selectDomain,
		redirectToSearch: domain => redirect( 'search', { q: domain } )
	}, dispatch )
)( SunriseHome );
