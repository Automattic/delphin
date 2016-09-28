// External dependencies
import { bindActionCreators } from 'redux';
import { getValues, reduxForm } from 'redux-form';

// Internal dependencies
import { getAsyncValidateFunction } from 'lib/form';
import i18n from 'i18n-calypso';
import RequireLogin from './require-login';
import SetUpExistingBlog from 'components/ui/set-up-existing-blog';
import { redirect } from 'actions/routes';

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
		hasAnsweredPreviousQuestion: !! getValues( state.form.setUpDomain ),
	} ),
	dispatch => bindActionCreators( {
		redirect
	}, dispatch )
)( RequireLogin( SetUpExistingBlog ) );
