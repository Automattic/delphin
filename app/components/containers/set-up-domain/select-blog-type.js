// External dependencies
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';

// Internal dependencies
import RequireLogin from 'components/containers/require-login';
import SelectBlogType from 'components/ui/set-up-domain/select-blog-type';
import { recordTracksEvent } from 'actions/analytics';
import { redirect } from 'actions/routes';

export default reduxForm(
	{
		form: 'selectBlogType',
		fields: [ 'newOrExisting' ],
		destroyOnUnmount: false
	},
	( state, ownProps ) => ( {
		domainName: ownProps.params.domainName,
	} ),
	dispatch => bindActionCreators( {
		recordTracksEvent,
		redirect
	}, dispatch )
)( RequireLogin( SelectBlogType ) );
