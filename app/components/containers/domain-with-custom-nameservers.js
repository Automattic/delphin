// External dependencies
import { connect } from 'react-redux';

// Internal dependencies
import { addNotice } from 'actions/notices';
import { fetchMyDomains, updateDomain } from 'actions/my-domains';
import DomainWithCustomNameservers from 'components/ui/my-domains/domain-card/domain-with-custom-nameservers';

export default connect(
	undefined,
	{
		addNotice,
		fetchMyDomains,
		updateDomain
	}
)( DomainWithCustomNameservers );

