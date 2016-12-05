// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import i18n from 'i18n-calypso';
import { bindHandlers } from 'react-bind-handlers';

// Internal dependencies
import styles from './styles.scss';
import { getPath } from 'routes';
import Button from 'components/ui/button';
import PartialUnderline from 'components/ui/partial-underline';
import DocumentTitle from 'components/ui/document-title';
import SunriseStep from 'components/ui/sunrise-step';
import TrackingLink from 'components/containers/tracking-link';

class ConfirmTrademark extends React.Component {
	componentDidMount() {
		const {
			hasLoadedAvailability,
			hasTrademarkClaim,
			hasSelectedDomain,
			selectedDomain,
			domainName,
			checkDomainAvailability,
			fetchDomainPrice,
			redirect,
			selectDomain
		} = this.props;

		if ( ! hasLoadedAvailability || ! hasSelectedDomain || selectedDomain.domainName !== domainName ) {
			checkDomainAvailability( { domainName } );
			const pricePromise = fetchDomainPrice( domainName );

			pricePromise.then( priceResult => selectDomain( priceResult.result ) );
		} else if ( ! hasTrademarkClaim &&
				hasSelectedDomain &&
				selectedDomain.domainName === domainName ) {
			redirect( 'contactInformation' );
		}
	}

	handleSubmit() {
		const { redirect } = this.props;

		redirect( 'contactInformation' );
	}

	componentWillReceiveProps( nextProps ) {
		const {
			hasLoadedAvailability,
			hasSelectedDomain,
			isAvailable,
			hasTrademarkClaim,
			selectedDomain,
			domainName,
			redirect
		} = nextProps;

		if ( hasLoadedAvailability && isAvailable && hasSelectedDomain && selectedDomain.domainName === domainName && ! hasTrademarkClaim ) {
			redirect( 'contactInformation' );
		}
	}

	render() {
		const {
			domainName,
			hasLoadedAvailability,
			isAvailable,
			hasSelectedDomain,
			hasTrademarkClaim,
			selectedDomain
		} = this.props;
		const requestedDomainHasClaim = ( hasLoadedAvailability &&
			hasTrademarkClaim &&
			hasSelectedDomain &&
			selectedDomain.domainName === domainName
		);

		return ( <SunriseStep>
			<DocumentTitle title={ i18n.translate( 'Confirm your trademark' ) } />
			{
				hasLoadedAvailability
					? <SunriseStep.Header>
						<h1>
							{ i18n.translate( 'Confirm your trademark' ) }
						</h1>
						<h2>
							{ isAvailable
								? i18n.translate( 'This domain is available, however there is a trademark claim on it' )
								: i18n.translate( 'This domain is not available' )
							}
						</h2>
					</SunriseStep.Header>
					: <SunriseStep.Header><h1>{ i18n.translate( 'Loading…' ) }</h1></SunriseStep.Header>
			}
			<SunriseStep.Form onSubmit={ this.handleSubmit }>
				<PartialUnderline>
					<h3>{ domainName }</h3>
				</PartialUnderline>

				{ hasLoadedAvailability &&
				<div className={ styles.trademarkNotice }>
					<p>
						{ i18n.translate( 'If you continue you will be sent an email to review the trademark notice before we ' +
							'can complete your registration.' ) }
					</p>
					<p>
						{ i18n.translate( 'Your order will be cancelled if you do not respond to this request within 48 hours.' ) }
					</p>
				</div> }

				<Button disabled={ ( ! requestedDomainHasClaim || ! isAvailable ) }>
					{ i18n.translate( 'Continue with trademark registration' ) }
				</Button>

			</SunriseStep.Form>
			<div className={ styles.backNotice }>
				<TrackingLink eventName="delphin_start_over_click" to={ getPath( 'home' ) }>
					{ i18n.translate( 'Find a different domain' ) }
				</TrackingLink>
			</div>
		</SunriseStep> );
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
