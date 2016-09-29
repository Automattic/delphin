// External dependencies
import { reduxForm } from 'redux-form';

// Internal dependencies
import { getAsyncValidateFunction } from 'lib/form';
import i18n from 'i18n-calypso';
import RequireLogin from './require-login';
import SetUpExistingBlog from 'components/ui/set-up-existing-blog';

const validate = values => {
	if ( ! values.url ) {
		return { url: i18n.translate( 'Please enter a url.' ) };
	}

	return {};
};

export default reduxForm(
	{
		form: 'setUpExistingBlog',
		fields: [ 'url' ],
		asyncValidate: getAsyncValidateFunction( validate )
	},
	( state, ownProps ) => ( {
		domainName: ownProps.params.domainName,
	} )
)( RequireLogin( SetUpExistingBlog ) );
