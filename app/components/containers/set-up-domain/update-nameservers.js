// External dependencies
import { reduxForm } from 'redux-form';

// Internal dependencies
import { redirect } from 'actions/routes';
import UpdateNameservers from 'components/ui/set-up-domain/update-nameservers';

export default reduxForm(
	{
		form: 'nameservers',
		fields: [
			'nameserver1',
			'nameserver2',
			'nameserver3',
			'nameserver4',
		]
	},
	( state, { params: { domainName } } ) => ( {
		domainName
	} ),
	{
		redirect
	}
)( UpdateNameservers );
