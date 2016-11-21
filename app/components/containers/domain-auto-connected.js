// External dependencies
import { connect } from 'react-redux';

// Internal dependencies
import { updateDomain } from 'actions/my-domains';
import DomainAutoConnected from 'components/ui/my-domains/domain-card/domain-auto-connected';

connect(
	undefined,
	{
		updateDomain
	}
)( DomainAutoConnected );
