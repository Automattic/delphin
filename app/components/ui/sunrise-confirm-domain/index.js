// External dependencies
import { bindHandlers } from 'react-bind-handlers';
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import Button from 'components/ui/button';
import PartialUnderline from 'components/ui/partial-underline';
import DocumentTitle from 'components/ui/document-title';
import { getPath } from 'routes';
import styles from './styles.scss';
import SunriseStep from 'components/ui/sunrise-step';
import TrackingLink from 'components/containers/tracking-link';
import withPageView from 'lib/analytics/with-page-view';
import scrollToTop from 'components/containers/scroll-to-top';

class SunriseConfirmDomain extends React.Component {
	componentWillMount() {
		if ( ! this.props.hasSelectedDomain ) {
			this.props.redirect( 'home' );
		}
	}

	handleSubmit( event ) {
		event.preventDefault();

		this.props.trackSubmit( this.props.domain.isPremium );

		if ( this.props.isLoggedIn ) {
			this.props.redirect( 'contactInformation' );
		} else {
			this.props.redirect( 'signupUser' );
		}
	}

	render() {
		const { domain, domainCost, applicationCost } = this.props;

		const { domainName, isPremium, totalCost } = domain;

		return (
			<SunriseStep>
				<DocumentTitle title={ i18n.translate( 'Apply now' ) } />
				<SunriseStep.Header>
					<h1>
						{ i18n.translate( 'Apply now' ) }
					</h1>
					<h2>
						{ i18n.translate( 'Applications are open until November 9. ' +
							'If others apply for the same domain, ' +
							'you will be able to bid for it in an auction.' ) }
					</h2>
				</SunriseStep.Header>

				<SunriseStep.Form className={ styles.confirmDomainForm } onSubmit={ this.handleSubmit }>
					{ isPremium && (
						<div className={ styles.premiumFlag }>
							{ i18n.translate( 'premium' ) }
						</div>
					) }

					<PartialUnderline className={ styles.domain }>
						<h3>{ domainName }</h3>
					</PartialUnderline>

					<div className={ styles.priceTag }>
						{ i18n.translate( '%(totalCost)s Early Application', {
							args: { totalCost }
						} ) }
					</div>
					<div className={ styles.renewalInfo }>
						{ i18n.translate( '%(domainCost)s registration + %(applicationCost)s application fee', {
							args: {
								applicationCost,
								domainCost
							}
						} ) }
					</div>
					<Button className={ styles.button }>
						{ i18n.translate( 'Apply for this domain' ) }
					</Button>
					<div className={ styles.feeNotice }>
						<h3 className={ styles.headline }>{ i18n.translate( 'Apply risk free' ) }</h3>
						<p className={ styles.happyCircle }>
							{ i18n.translate( 'Even though .blog domains are not yet available for everyone, submitting an application puts you in the running to claim mike.blog, risk free.' ) }
						</p>
						<p>
							{ i18n.translate( 'Your payment will be refunded if your domain goes to auction and you don\'t win.' ) }
						</p>
						<p>
							{ i18n.translate( 'You can register any mike.blog without an application fee starting on November 21. Just beware you could miss out if your domain if you\'re not the first to grab it. If you don\'t want to apply now, sign-up for updates and we\'ll email you when it\'s time to register.' ) }
						</p>
					</div>
				</SunriseStep.Form>
				<div className={ styles.backNotice }>
					<div>
						{ i18n.translate( 'Not what you wanted?' ) }
					</div>
					<TrackingLink eventName="delphin_start_over_click" to={ getPath( 'home' ) }>
						{ i18n.translate( 'Try a different domain' ) }
					</TrackingLink>
				</div>
			</SunriseStep>
		);
	}
}

SunriseConfirmDomain.propTypes = {
	applicationCost: PropTypes.string.isRequired,
	domain: PropTypes.object,
	domainCost: PropTypes.string.isRequired,
	hasSelectedDomain: PropTypes.bool.isRequired,
	isLoggedIn: PropTypes.bool.isRequired,
	redirect: PropTypes.func.isRequired,
	trackSubmit: PropTypes.func.isRequired
};

export default scrollToTop( withStyles( styles )( withPageView( bindHandlers( SunriseConfirmDomain ), 'Confirm Domain' ) ) );
