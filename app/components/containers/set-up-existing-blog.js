// External dependencies
import { bindActionCreators } from 'redux';
import { getValues, reduxForm } from 'redux-form';

// Internal dependencies
import { extractHostName } from 'lib/domains';
import { getAsyncValidateFunction } from 'lib/form';
import i18n from 'i18n-calypso';
import RequireLogin from './require-login';
import SetUpExistingBlog from 'components/ui/set-up-existing-blog';
import { redirect } from 'actions/routes';

const validate = values => {
	const { url } = values;

	if ( ! url ) {
		return { url: i18n.translate( 'Please enter a url.' ) };
	}

	const hostName = extractHostName( url );

	if ( ! hostName ) {
		return { url: i18n.translate( "That doesn't look like an address. Copy your blog's address from the address bar at the top of the screen when you visit the blog." ) };
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
		hasAnsweredPreviousQuestion: !! getValues( state.form.selectBlogType ),
	} ),
	dispatch => bindActionCreators( {
		redirect
	}, dispatch )
)( RequireLogin( SetUpExistingBlog ) );
