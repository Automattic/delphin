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
			{ domains.map( ( { domainName, isSetup } ) =>
				<DomainCard
					key={ domainName }
					domainName={ domainName }
					isSetup={ isSetup }
					detailsVisible={ areDetailsVisible( domainName ) }
					toggleDetails={ toggleDetails( domainName ) } />
			) }
			<NewDomainCard/>
		</div>
	);
};

DomainCardList.propTypes = {
	areDetailsVisible: PropTypes.func.isRequired,
	domains: PropTypes.array.isRequired,
	toggleDomainDetails: PropTypes.func.isRequired
};

export default withStyles( styles )( DomainCardList );
