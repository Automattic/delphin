// External dependencies
import { connect } from 'react-redux';

// Internal dependencies
import { redirect } from 'actions/routes';
import UpdateNameservers from 'components/ui/set-up-domain/update-nameservers';

export default connect(
	( state, { params: { domainName } } ) => ( {
		domainName
	} ),
	{
		redirect
	}
)( UpdateNameservers );
