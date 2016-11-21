// External dependencies
import { connect } from 'react-redux';

// Internal dependencies
import { addNotice } from 'actions/notices';
import { fetchMyDomains, updateDomain } from 'actions/my-domains';
import DomainAutoConnected from 'components/ui/my-domains/domain-card/domain-auto-connected';

export default connect(
	undefined,
	{
		addNotice,
		fetchMyDomains,
		updateDomain
	}
)( DomainAutoConnected );
