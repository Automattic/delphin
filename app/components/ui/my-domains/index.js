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
			return (
				<div className={ styles.domainsLoading }>
					<svg className={ styles.satellite } width="78px" height="94px" viewBox="-1 -1 79 95">
						<path d="M41.2891,91.4255 L3.7251,91.4255 C1.6761,91.4255 0.0001,89.7495 0.0001,87.7005 L0.0001,87.7005 C0.0001,85.6515 1.6761,83.9745 3.7251,83.9745 L41.2891,83.9745 C43.3381,83.9745 45.0141,85.6515 45.0141,87.7005 L45.0141,87.7005 C45.0141,89.7495 43.3381,91.4255 41.2891,91.4255 Z"></path>
						<polygon points="5.0993 83.9748 22.5073 53.8238 39.9153 83.9748"></polygon>
						<path d="M22.5072,53.8234 L22.5072,83.9744"></path>
						<path d="M15.1364,67.8317 L29.8784,67.8317"></path>
						<path d="M9.8307,76.5242 L35.6137,76.5242"></path>
						<path d="M47.1699,28.8189 C55.8629,37.5119 61.2829,46.1839 59.2769,48.1899 C57.2719,50.1949 48.5979,44.7749 39.9049,36.0839 C31.2139,27.3909 25.7939,18.7189 27.7989,16.7119 C29.8049,14.7059 38.4769,20.1259 47.1699,28.8189" className={ styles.satelliteDish }></path>
						<path d="M47.1699,28.8189 C55.8629,37.5119 61.2829,46.1839 59.2769,48.1899 C57.2719,50.1949 48.5979,44.7749 39.9049,36.0839 C31.2139,27.3909 25.7939,18.7189 27.7989,16.7119 C29.8049,14.7059 38.4769,20.1259 47.1699,28.8189 Z"></path>
						<path d="M39.9058,36.0829 L53.7298,22.2589"></path>
						<path d="M56.1519,19.8369 C57.4889,21.1739 57.4889,23.3419 56.1519,24.6789 C54.8149,26.0159 52.6469,26.0159 51.3099,24.6789 C49.9729,23.3419 49.9729,21.1739 51.3099,19.8369 C52.6469,18.4999 54.8149,18.4999 56.1519,19.8369" className={ styles.satellitePoint }></path>
						<path d="M52.0184,0 C65.2364,0 75.9884,10.752 75.9884,23.97" className={ styles.signal3 }></path>
						<path d="M52.0184,6.6509 C61.5684,6.6509 69.3374,14.4199 69.3374,23.9709" className={ styles.signal2 }></path>
						<path d="M52.0184,13.1468 C57.9954,13.1468 62.8424,17.9928 62.8424,23.9708" className={ styles.signal1 }></path>
						<path d="M39.9058,36.0829 C31.2128,27.3899 25.7928,18.7179 27.7988,16.7119 C21.1128,23.3989 22.7378,35.8659 31.4308,44.5579 C40.1228,53.2509 52.5898,54.8759 59.2768,48.1899 C57.2708,50.1959 48.5988,44.7759 39.9058,36.0829 Z"></path>
						<path d="M55.2969,50.9358 C51.9089,52.5618 44.9929,48.0128 36.3009,39.3208"></path>
						<path d="M31.4309,44.5578 C27.8129,40.9398 25.4399,36.6698 24.3599,32.4338 C21.1939,36.6388 20.5179,43.3298 24.1659,46.9788 L29.0099,51.8228 C32.6589,55.4708 39.3499,54.7948 43.5549,51.6288 C39.3189,50.5488 35.0489,48.1758 31.4309,44.5578 Z"></path>
						<path d="M24.4016,54.2916 C21.3166,54.2916 21.3606,51.7716 21.5276,50.8276 C21.6356,50.2206 21.9666,49.6726 22.4036,49.2366 L23.7126,47.9266 C24.0936,47.5466 24.7096,47.5466 25.0906,47.9266 L27.8446,50.6816 C28.2246,51.0616 28.2246,51.6776 27.8446,52.0586 L26.4676,53.4356 C25.9156,53.9876 25.1816,54.2916 24.4016,54.2916 Z"></path>
					</svg>
					{ i18n.translate( 'Getting your domains…' ) }
				</div>
			);
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
