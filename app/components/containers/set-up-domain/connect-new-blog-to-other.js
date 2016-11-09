// External dependencies
import { reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';

// Internal dependencies
import { addNotice } from 'actions/notices';
import RequireLogin from 'components/containers/require-login';
import ConnectNewBlogToOther from 'components/ui/set-up-domain/connect-new-blog/other';
import { redirect } from 'actions/routes';
import { contactSupport } from 'actions/contact-support';
import { getBlogNeedSelected } from 'reducers/form/selectors';
import { isContactingSupport } from 'reducers/contact-support/selectors';
import scrollToTop from 'components/containers/scroll-to-top';

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
	}, dispatch )
)( scrollToTop( RequireLogin( ConnectNewBlogToOther ) ) );
