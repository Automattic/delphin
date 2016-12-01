// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import DocumentTitle from 'components/ui/document-title';
import DomainCardList from 'components/ui/my-domains/domain-card-list';
import scrollToTop from 'components/containers/scroll-to-top';
import styles from './styles.scss';
import withPageView from 'lib/analytics/with-page-view';
import Satellite from 'components/ui/satellite';

const MyDomains = React.createClass( {
	propTypes: {
		destroySetupForms: PropTypes.func.isRequired,
		domains: PropTypes.object.isRequired,
		fetchMyDomains: PropTypes.func.isRequired
	},

	componentWillMount() {
		if ( ! this.props.domains.hasLoadedFromServer && ! this.props.domains.isRequesting ) {
			this.props.fetchMyDomains();
		}
	},

	componentDidMount() {
		// Only one domain's setup forms are stored in memory at a time. In
		// order to prevent the user from seeing stale form data when they
		// switch to set up another domain, we destroy them all here.
		this.props.destroySetupForms();
	},

	renderDomains() {
		if ( ! this.props.domains.hasLoadedFromServer ) {
			return (
				<div className={ styles.domainsLoading }>
					<Satellite width="78px" height="94px" />
					{
						i18n.translate( 'Getting your domains…', {
							comment: 'Refers to a list of domains that the user has already purchased'
						} )
					}
				</div>
			);
		}

		return (
			<DomainCardList
				domains={ this.props.domains.data.results } />
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

export default scrollToTop( withStyles( styles )( withPageView( MyDomains, 'My Domains' ) ) );
