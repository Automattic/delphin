// External dependencies
import { getValues, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';

// Internal dependencies
import RequireLogin from 'components/containers/require-login';
import ConnectNewBlogToOther from 'components/ui/set-up-domain/connect-new-blog/other';
import { redirect } from 'actions/routes';
import { contactSupport } from 'actions/contact-support';
import { isContactingSupport } from 'reducers/contact-support/selectors';

export default reduxForm(
	{
		form: 'connectNewBlogToOther',
		fields: [ 'providerText' ],
		destroyOnUnmount: false
	},
	( state, ownProps ) => ( {
		domainName: ownProps.params.domainName,
		hasAnsweredPreviousQuestion: !! getValues( state.form.selectNewBlogHost ),
		isContactingSupport: isContactingSupport( state ),
	} ),
	dispatch => bindActionCreators( {
		contactSupport,
		redirect,
	}, dispatch )
)( RequireLogin( ConnectNewBlogToOther ) );
