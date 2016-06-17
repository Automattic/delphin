// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';
import DomainCard from 'components/ui/my-domains/domain-card';
import NewDomainCard from 'components/ui/my-domains/new-domain-card';

const DomainCardList = ( {
		domains,
		areDetailsVisible,
		toggleDomainDetails
	} ) => {

	return (
		<div className={ styles.domainCardList }>
			{ domains.map( ( { domain_name, is_setup } ) =>
				<DomainCard
					key={ domain_name }
					domainName={ domain_name }
					isSetup={ is_setup }
					detailsVisible={ areDetailsVisible( domain_name ) }
					toggleDetails={ () => toggleDomainDetails( domain_name )  } />
			) }
			<NewDomainCard/>
		</div>
	);
};

DomainCardList.propTypes = {
	domains: PropTypes.array.isRequired,
	areDetailsVisible: PropTypes.func.isRequired,
	toggleDomainDetails: PropTypes.func.isRequired
};

export default withStyles( styles )( DomainCardList );
