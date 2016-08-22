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
						<h3 className={ styles.headline }>{ i18n.translate( 'Get your domain, or get your money back' ) }</h3>
						<p className={ styles.happyCircle }>
							{ i18n.translate( 'Apply now for a chance to own the domain you want. It\'s the best way to secure example.blog before everyone else.' ) }
						</p>
						<p>
							{ i18n.translate( 'It\'s also risk-free: We can\'t guarantee you\'ll get the domain, but if you don’t get it, we\'ll refund your payment in full.' ) }
						</p>
						<p>
							<a href="#" className={ styles.more }>
								{ i18n.translate( 'More about the application process' ) }
							</a>
						</p>
						<p>
							{ i18n.translate( 'If others apply for example.blog, it will go to an auction, with no price limit. If example.blog contains a trademark, the owners may register it in a separate process, cancelling out your application.' ) }
						</p>
						<p>
							{ i18n.translate( 'Either way, if you don’t get your domain, your payment will be refunded.' ) }
						</p>
						<p>
							{ i18n.translate( 'Starting November 21, any remaining domains that did not get registered will be available starting at $30 a year.' ) }
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
