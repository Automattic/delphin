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
import scrollToTop from 'components/containers/scroll-to-top';
import styles from './styles.scss';
import SunriseStep from 'components/ui/sunrise-step';
import TrackingLink from 'components/containers/tracking-link';
import withPageView from 'lib/analytics/with-page-view';
import { normalizeDomain, validateDomain, withTld } from 'lib/domains';

class SunriseConfirmDomain extends React.Component {
	componentWillMount() {
		const { query, redirect } = this.props;

		if ( ! query || validateDomain( query ) ) {
			redirect( 'home' );
		}
	}

	componentDidMount() {
		const { domain, query } = this.props;

		if ( domain.domainName !== normalizeDomain( query ) ) {
			const { fetchDomainPrice, selectDomain } = this.props;

			fetchDomainPrice( query ).then( action => {
				selectDomain( action.result );
			} );
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

	handleClickMoreInformationLink( event ) {
		event.preventDefault();

		this.props.showToggle( 'isMoreInformationVisible' );
	}

	renderDomainInformation() {
		const { domain, hasSelectedDomain } = this.props;

		if ( ! hasSelectedDomain ) {
			return (
				<div>
					<div className={ styles.priceTag }>
					</div>
					<div className={ styles.renewalInfo }>
						{ i18n.translate( 'Loading domain information…' ) }
					</div>
				</div>
			);
		}

		const { currencyCode, totalCost } = domain;

		return (
			<div>
				<div className={ styles.priceTag }>
					<span className="_price-with-currency-code">
						{ totalCost } { currencyCode }
					</span>
				</div>
			</div>
		);
	}

	renderFreeNotice() {
		const { domain, hasSelectedDomain, isMoreInformationVisible } = this.props;

		if ( ! hasSelectedDomain ) {
			return null;
		}

		const { domainName } = domain;

		return (
			<div className={ styles.feeNotice }>
				<h3 className={ styles.headline }>{ i18n.translate( 'Get your domain, or get your money back' ) }</h3>
				<p className={ styles.happyCircle }>
					{ i18n.translate( 
						'We will try to get %(domainName)s for as soon as ' +
						'.blog becomes widely available, on November 21st. ', {
						args: { domainName }
					} ) }
				</p>
				<p>
					{ i18n.translate(
						'Your application may fail if someone else manages to register' +
						' the same domain before we do.'
						) }
				</p>
				<p>
					{ i18n.translate(
						'If we can\'t get your domain for you, we\'ll give you a full refund.'
						) }
				</p>
			</div>
		);
	}

	render() {
		const { domain, hasSelectedDomain, query } = this.props;

		let domainName, isPremium = false;
		if ( hasSelectedDomain ) {
			domainName = domain.domainName;
			isPremium = domain.isPremium;
		} else if ( query ) {
			domainName = withTld( query );
		} else {
			// this is the name that is displayed before redirecting if the
			// user accesses this page directly
			domainName = 'example.blog';
		}

		return (
			<SunriseStep>
				<DocumentTitle title={ i18n.translate( 'Apply now' ) } />
				<SunriseStep.Header>
					<h1>
						{ i18n.translate( 'Apply now' ) }
					</h1>
					<h2>
						{ i18n.translate( 'Apply for a chance to own a .blog domain ' +
							'on launch day. ' ) }
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

					{ this.renderDomainInformation() }

					<Button className={ styles.button } disabled={ ! hasSelectedDomain }>
						{ i18n.translate( 'Apply for this domain' ) }
					</Button>

					{ this.renderFreeNotice() }
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
	domain: PropTypes.object,
	fetchDomainPrice: PropTypes.func.isRequired,
	hasSelectedDomain: PropTypes.bool.isRequired,
	isLoggedIn: PropTypes.bool.isRequired,
	isMoreInformationVisible: PropTypes.bool.isRequired,
	query: PropTypes.string,
	redirect: PropTypes.func.isRequired,
	selectDomain: PropTypes.func.isRequired,
	showToggle: PropTypes.func.isRequired,
	trackSubmit: PropTypes.func.isRequired,
	unselectDomain: PropTypes.func.isRequired
};

export default scrollToTop( withStyles( styles )( withPageView( bindHandlers( SunriseConfirmDomain ), 'Confirm Domain' ) ) );
