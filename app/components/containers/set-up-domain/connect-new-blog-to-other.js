// External dependencies
import { reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';

// Internal dependencies
import { addNotice } from 'actions/notices';
import RequireLogin from 'components/containers/require-login';
import ConnectNewBlogToOther from 'components/ui/set-up-domain/connect-new-blog-to-other';
import { redirect } from 'actions/routes';
import { contactSupport } from 'actions/contact-support';
import { getBlogNeedSelected } from 'reducers/form/selectors';
import { isContactingSupport } from 'reducers/contact-support/selectors';
import { recordTracksEvent } from 'actions/analytics';

export default reduxForm(
	{
		form: 'connectNewBlogToOther',
		fields: [ 'providerText' ],
		destroyOnUnmount: false
	},
	( state, ownProps ) => ( {
		domainName: ownProps.params.domainName,
		isContactingSupport: isContactingSupport( state ),
		needs: getBlogNeedSelected( state ),
	} ),
	dispatch => bindActionCreators( {
		addNotice,
		contactSupport,
		redirect,
		recordTracksEvent,
	}, dispatch )
)( RequireLogin( ConnectNewBlogToOther ) );
