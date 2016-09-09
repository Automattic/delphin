// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import DocumentTitle from 'components/ui/document-title';
import DomainCardList from 'components/ui/my-domains/domain-card-list';
import styles from './styles.scss';
import withPageView from 'lib/analytics/with-page-view';

const MyDomains = React.createClass( {
	propTypes: {
		areDomainDetailsVisible: PropTypes.func.isRequired,
		domains: PropTypes.object.isRequired,
		fetchMyDomains: PropTypes.func.isRequired,
		isLoggedOut: PropTypes.bool.isRequired,
		redirectToHome: PropTypes.func.isRequired,
		toggleDomainDetails: PropTypes.func.isRequired
	},

	componentWillMount() {
		if ( this.props.isLoggedOut ) {
			this.props.redirectToHome();
		} else if ( ! this.props.domains.hasLoadedFromServer && ! this.props.domains.isRequesting ) {
			this.props.fetchMyDomains();
		}
	},

	componentWillReceiveProps( nextProps ) {
		if ( nextProps.isLoggedOut ) {
			this.props.redirectToHome();
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
			<DocumentTitle title={ i18n.translate( 'My Domains' ) }>
				<div className={ styles.myDomains }>
					{ this.renderDomains() }
				</div>
			</DocumentTitle>
		);
	}
} );

export default withStyles( styles )( withPageView( MyDomains, 'My Domains' ) );
