// External dependencies
import { bindHandlers } from 'react-bind-handlers';
import isEmpty from 'lodash/isEmpty';
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
import { validateDomain, withTld } from 'lib/domains';

class SunriseConfirmDomain extends React.Component {
	componentWillMount() {
		const { query, redirect, unselectDomain } = this.props;

		if ( query && ! isEmpty( validateDomain( query ) ) ) {
			redirect( 'home', '?query=' + query );
		}

		if ( ! query ) {
			redirect( 'home' );
		} else {
			unselectDomain();
		}
	}

	componentDidMount() {
		const { fetchDomainPrice, query, selectDomain } = this.props;

		if ( query ) {
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

	renderDomainInformation() {
		const { domain, domainCost, applicationCost, hasSelectedDomain } = this.props;

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

		const { totalCost } = domain;

		return (
			<div>
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
			domainName = 'mydomain.blog';
		}

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

					{ this.renderDomainInformation() }

					<Button className={ styles.button } disabled={ ! hasSelectedDomain }>
						{ i18n.translate( 'Apply for this domain' ) }
					</Button>

					<div className={ styles.backNotice }>
						<div>
							{ i18n.translate( 'Not what you wanted?' ) }
						</div>
						<TrackingLink eventName="delphin_start_over_click" to={ getPath( 'home' ) }>
							{ i18n.translate( 'Try a different domain' ) }
						</TrackingLink>
					</div>
				</SunriseStep.Form>
			</SunriseStep>
		);
	}
}

SunriseConfirmDomain.propTypes = {
	applicationCost: PropTypes.string,
	domain: PropTypes.object,
	domainCost: PropTypes.string,
	fetchDomainPrice: PropTypes.func.isRequired,
	hasSelectedDomain: PropTypes.bool.isRequired,
	isLoggedIn: PropTypes.bool.isRequired,
	query: PropTypes.string,
	redirect: PropTypes.func.isRequired,
	selectDomain: PropTypes.func.isRequired,
	trackSubmit: PropTypes.func.isRequired,
	unselectDomain: PropTypes.func.isRequired
};

export default scrollToTop( withStyles( styles )( withPageView( bindHandlers( SunriseConfirmDomain ), 'Confirm Domain' ) ) );
