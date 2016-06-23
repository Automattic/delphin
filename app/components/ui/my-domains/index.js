// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import DomainCardList from 'components/ui/my-domains/domain-card-list';
import NoMarginLayout from 'components/ui/layout/no-margin';
import styles from './styles.scss';

const MyDomains = React.createClass( {
	propTypes: {
		areDomainDetailsVisible: PropTypes.func.isRequired,
		domains: PropTypes.object.isRequired,
		fetchMyDomains: PropTypes.func.isRequired,
		isLoggedOut: PropTypes.bool.isRequired,
		redirectToLogin: PropTypes.func.isRequired,
		toggleDomainDetails: PropTypes.func.isRequired
	},

	componentWillMount() {
		if ( this.props.isLoggedOut ) {
			this.props.redirectToLogin();
		} else {
			this.props.fetchMyDomains();
		}
	},

	componentWillReceiveProps( nextProps ) {
		if ( nextProps.isLoggedOut ) {
			this.props.redirectToLogin();
		}
	},

	renderDomains() {
		if ( ! this.props.domains.hasLoadedFromServer ) {
			return <div>{ i18n.translate( 'Loading…' ) }</div>;
		}

		return (
			<DomainCardList
				domains={ this.props.domains.data.results }
				toggleDomainDetails={ this.props.toggleDomainDetails }
				areDetailsVisible={ this.props.areDomainDetailsVisible } />
		);
	},

	render() {
		return (
			<NoMarginLayout>
				<div className={ styles.myDomains }>
					{ this.renderDomains() }
				</div>
			</NoMarginLayout>
		);
	}
} );

export default withStyles( styles )( MyDomains );
