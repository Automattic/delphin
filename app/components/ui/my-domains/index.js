// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import config from 'config';
import DomainCardList from 'components/ui/my-domains/domain-card-list';
import styles from './styles.scss';

const MyDomains = React.createClass( {
	propTypes: {
		fetchMyDomains: PropTypes.func.isRequired
	},

	componentWillMount() {
		this.props.fetchMyDomains();
	},

	render() {
		if ( ! this.props.domains.hasLoadedFromServer ) {
			return <div>Loading...</div>;
		}

		return (
			<div className={ styles.myDomains }>
				<DomainCardList domains={ this.props.domains.data } />
			</div>
		);
	}
} );

export default withStyles( styles )( MyDomains );
