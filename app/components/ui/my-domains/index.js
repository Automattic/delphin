// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import DomainCardList from 'components/ui/my-domains/domain-card-list';
import styles from './styles.scss';
import withTitle from 'lib/title-decorator';

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
			<div className={ styles.myDomains }>
				{ this.renderDomains() }
			</div>
		);
	}
} );

export default withStyles( styles )( withTitle( MyDomains, i18n.translate( 'My Domains' ) ) );
