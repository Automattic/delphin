// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';
import DomainCard from 'components/ui/my-domains/domain-card';
import NewDomainCard from 'components/ui/my-domains/new-domain-card';

const DomainCardList = ( { domains } ) => {
	return (
		<div className={ styles.domainCardList }>
			{ domains.map( ( { domain_name } ) =>
				<DomainCard
					domainName={ domain_name }
					isSetup={ Math.random() < 0.5 }>
				</DomainCard>
			) }
			<NewDomainCard/>
		</div>
	);
};

DomainCardList.propTypes = {
	domains: PropTypes.array.isRequired
};

export default withStyles( styles )( DomainCardList );
