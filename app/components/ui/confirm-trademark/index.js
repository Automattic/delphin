// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import i18n from 'i18n-calypso';
import { bindHandlers } from 'react-bind-handlers';

// Internal dependencies
import styles from './styles.scss';
import { getPath } from 'routes';
import Button from 'components/ui/button';
import DocumentTitle from 'components/ui/document-title';
import SunriseStep from 'components/ui/sunrise-step';
import Form from 'components/ui/form';
import TrackingLink from 'components/containers/tracking-link';

class ConfirmTrademark extends React.Component {
	isDataLoaded( props = this.props ) {
		const {
			domainName,
			hasLoadedAvailability,
			hasSelectedDomain,
			selectedDomain
		} = props;

		return hasLoadedAvailability && hasSelectedDomain && selectedDomain.domainName === domainName;
	}

	componentDidMount() {
		const {
			hasTrademarkClaim,
			isAvailable,
			domainName,
			checkDomainAvailability,
			fetchDomainPrice,
			redirect,
			selectDomain
		} = this.props;

		if ( ! this.isDataLoaded() ) {
			checkDomainAvailability( { domainName } );
			const pricePromise = fetchDomainPrice( domainName );

			pricePromise.then( priceResult => selectDomain( priceResult.result ) );
		} else if ( ! isAvailable ) {
			redirect( 'home' );
		} else if ( ! hasTrademarkClaim ) {
			redirect( 'contactInformation' );
		}
	}

	componentWillReceiveProps( nextProps ) {
		const {
			isAvailable,
			hasTrademarkClaim,
			redirect
		} = nextProps;

		if ( this.isDataLoaded( nextProps ) ) {
			if ( ! isAvailable ) {
				redirect( 'home' );
			} else if ( ! hasTrademarkClaim ) {
				redirect( 'contactInformation' );
			}
		}
	}

	handleSubmit( event ) {
		event.preventDefault();

		this.props.redirect( 'contactInformation' );
	}

	render() {
		const domainName = this.props.domainName;

		if ( ! this.isDataLoaded() ) {
			return (
				<SunriseStep>
					<p>{ i18n.translate( 'Loading…' ) }</p>
				</SunriseStep>
			);
		}

		return (
			<SunriseStep>
				<DocumentTitle title={ i18n.translate( 'Trademark claim' ) } />

				<SunriseStep.Header>
					<h1>
						{ i18n.translate( 'Trademark claim' ) }
					</h1>
				</SunriseStep.Header>

				<div className={ styles.trademarkWarning }>
					<p>{ i18n.translate( '%(domainName)s matches a known trademark.', {
						args: { domainName }
					} ) }</p>
				</div>

				<Form className={ styles.form } onSubmit={ this.handleSubmit }>
					<Form.FieldArea>
						<p>
							{ i18n.translate( 'To register this domain, you must agree to the terms of the trademark claim. The trademark holder will be notified, and they may choose to dispute your registration.' ) }
						</p>
						<p>
							{ i18n.translate( "We'll send you an email with further instructions after you submit your order." ) }
						</p>
					</Form.FieldArea>

					<Form.SubmitArea>
						<Button>
							{ i18n.translate( 'Continue with trademark registration' ) }
						</Button>
					</Form.SubmitArea>

					<Form.Footer>
						<p>{ i18n.translate( "Please review the terms and agree to them within 48 hours. You'll get an automatic refund if you reject the terms or if you don't agree to them on time." ) }</p>
					</Form.Footer>
				</Form>

				<SunriseStep.Footer>
					<TrackingLink
						className={ styles.backLink }
						eventName="delphin_start_over_click"
						to={ getPath( 'home' ) }
					>
						{ i18n.translate( 'Find a different domain' ) }
					</TrackingLink>
				</SunriseStep.Footer>
			</SunriseStep>
		);
	}
}

ConfirmTrademark.propTypes = {
	checkDomainAvailability: PropTypes.func.isRequired,
	domainName: PropTypes.string.isRequired,
	fetchDomainPrice: PropTypes.func.isRequired,
	hasLoadedAvailability: PropTypes.bool.isRequired,
	hasSelectedDomain: PropTypes.bool.isRequired,
	hasTrademarkClaim: PropTypes.bool.isRequired,
	isAvailable: PropTypes.bool.isRequired,
	redirect: PropTypes.func.isRequired,
	selectDomain: PropTypes.func.isRequired,
	selectedDomain: PropTypes.object.isRequired
};

export default withStyles( styles )( bindHandlers( ConfirmTrademark ) );
