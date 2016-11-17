// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';
import DomainCard from 'components/ui/my-domains/domain-card';
import NewDomainCard from 'components/ui/my-domains/new-domain-card';

const DomainCardList = ( { domains, areDetailsVisible, toggleDomainDetails } ) => {
	const toggleDetails = ( domainName ) => () => toggleDomainDetails( domainName );

	return (
		<div className={ styles.domainCardList }>
			{ domains.map( ( { hostName, id, name, service } ) =>
				<DomainCard
					key={ id }
					name={ name }
					detailsVisible={ areDetailsVisible( name ) }
					hostName={ hostName }
					service={ service }
					toggleDetails={ toggleDetails( name ) } />
			) }
			<NewDomainCard />
		</div>
	);
};

DomainCardList.propTypes = {
	areDetailsVisible: PropTypes.func.isRequired,
	domains: PropTypes.array.isRequired,
	toggleDomainDetails: PropTypes.func.isRequired
};

export default withStyles( styles )( DomainCardList );
