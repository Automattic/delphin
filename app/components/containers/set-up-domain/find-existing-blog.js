// External dependencies
import { bindActionCreators } from 'redux';
import { getValues, reduxForm } from 'redux-form';

// Internal dependencies
import { extractHostName } from 'lib/domains';
import { getAsyncValidateFunction } from 'lib/form';
import i18n from 'i18n-calypso';
import RequireLogin from 'components/containers/require-login';
import FindExistingBlog from 'components/ui/set-up-domain/find-existing-blog';
import { redirect } from 'actions/routes';
import { fetchService } from 'actions/service';
import { isRequestingService } from 'reducers/service/selectors';
import { recordTracksEvent } from 'actions/analytics';

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
		form: 'findExistingBlog',
		fields: [ 'url' ],
		asyncValidate: getAsyncValidateFunction( validate ),
		destroyOnUnmount: false
	},
	( state, ownProps ) => ( {
		domainName: ownProps.params.domainName,
		hasAnsweredPreviousQuestion: !! getValues( state.form.selectBlogType ),
		isRequestingService: isRequestingService( state ),
	} ),
	dispatch => bindActionCreators( {
		fetchService,
		recordTracksEvent,
		redirect,
	}, dispatch )
)( RequireLogin( FindExistingBlog ) );
