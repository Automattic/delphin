// External dependencies
import { reduxForm } from 'redux-form';

// Internal dependencies
import { addNotice } from 'actions/notices';
import { redirect } from 'actions/routes';
import UpdateNameservers from 'components/ui/set-up-domain/update-nameservers';
import { isUpdatingNameservers } from 'reducers/nameservers/selectors';
import { updateNameservers } from 'actions/nameservers';

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
		domainName,
		isUpdatingNameservers: isUpdatingNameservers( state ),
	} ),
	{
		addNotice,
		redirect,
		updateNameservers,
	}
)( UpdateNameservers );
