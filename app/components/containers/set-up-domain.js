// External dependencies
import { reduxForm } from 'redux-form';

// Internal dependencies
import SetUpDomain from 'components/ui/set-up-domain';

export default reduxForm(
	{
		form: 'set-up-domain',
		fields: [ 'newOrExisting' ]
	},
	( state, ownProps ) => ( {
		domainName: ownProps.params.domainName,
	} )
)( SetUpDomain );
