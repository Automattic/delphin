// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';
import DomainCard from 'components/ui/my-domains/domain-card';
import NewDomainCard from 'components/ui/my-domains/new-domain-card';

const DomainCardList = ( { domains } ) => {
	return (
		<div className={ styles.domainCardList }>
			{ domains.map( ( { hostName, id, hasZone, name, service } ) =>
				<DomainCard
					key={ id }
					hostName={ hostName }
					domainName={ name }
					service={ service }
					isPending={ ! hasZone } />
			) }
			<NewDomainCard />
		</div>
	);
};

DomainCardList.propTypes = {
	domains: PropTypes.array.isRequired
};

export default withStyles( styles )( DomainCardList );
