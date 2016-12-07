// External dependencies
import classNames from 'classnames';
import find from 'lodash/find';
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import PartialUnderline from 'components/ui/partial-underline';
import WaitingDots from 'components/ui/waiting-dots';
import Tag from 'components/ui/tag';
import styles from './styles.scss';

const Suggestion = React.createClass( {
	propTypes: {
		checkDomainAvailability: PropTypes.func.isRequired,
		hasLoadedAvailability: PropTypes.bool.isRequired,
		hasTrademarkClaim: PropTypes.bool.isRequired,
		isAvailable: PropTypes.bool.isRequired,
		isBestMatch: PropTypes.bool.isRequired,
		isRequestingAvailability: PropTypes.bool.isRequired,
		isRequestingAvailabilityForOtherDomain: PropTypes.bool.isRequired,
		redirect: PropTypes.func.isRequired,
		selectDomain: PropTypes.func.isRequired,
		suggestion: PropTypes.object.isRequired
	},

	goToNextPage( { hasTrademarkClaim, suggestion } ) {
		this.props.selectDomain( suggestion );

		if ( hasTrademarkClaim ) {
			this.props.redirect( 'confirmTrademark', { pathParams: { domainName: suggestion.domainName } } );
		} else {
			this.props.redirect( 'contactInformation' );
		}
	},

	selectDomain() {
		if ( this.props.hasLoadedAvailability && this.props.isAvailable ) {
			this.goToNextPage( this.props );
		} else if ( ! this.props.isRequestingAvailability ) {
			this.props.checkDomainAvailability( this.props.suggestion );
		}
	},

	componentWillReceiveProps( nextProps ) {
		if ( ! this.props.hasLoadedAvailability && nextProps.hasLoadedAvailability && nextProps.isAvailable ) {
			this.goToNextPage( nextProps );
		}
	},

	buttonText() {
		if ( this.props.isRequestingAvailability ) {
			return <WaitingDots />;
		}

		return i18n.translate( 'Select' );
	},

	isTaken() {
		const { isAvailable, hasLoadedAvailability } = this.props;

		return hasLoadedAvailability && ! isAvailable;
	},

	renderSuggestionTakenMessage() {
		if ( ! this.isTaken() ) {
			return null;
		}

		return (
			<div className={ styles.suggestionTakenMessageContainer }>
				<div className={ styles.suggestionTakenMessage }>
					{ i18n.translate( 'Sorry, %(domainName)s has been purchased recently and is no longer available.', {
						args: { domainName: this.props.suggestion.domainName }
					} ) }
				</div>
			</div>
		);
	},

	renderBestMatch() {
		const { isBestMatch } = this.props;

		if ( ! isBestMatch || this.isTaken() ) {
			return null;
		}

		return (
			<div className={ styles.exactMatch }>{ i18n.translate( 'Best match' ) }</div>
		);
	},

	renderPremiumTag() {
		const isPremium = this.props.suggestion.isPremium;

		if ( ! isPremium ) {
			return;
		}

		return (
			<Tag className={ styles.premiumTag }>
				{ i18n.translate( 'Premium' ) }
			</Tag>
		);
	},

	render() {
		const domainDetails = find( this.props.suggestion.details, { productSlug: 'delphin-domain' } );
		const { cost } = domainDetails;
		const className = classNames( styles.suggestion, {
			[ styles.isTaken ]: ! this.props.isAvailable && this.props.hasLoadedAvailability,
			[ styles.isRequesting ]: this.props.isRequestingAvailability,
			[ styles.isDisabled ]: this.props.isRequestingAvailabilityForOtherDomain
		} );

		return (
			<li className={ className } onClick={ this.selectDomain }>
				<div className={ styles.suggestionInfo }>
					{ this.renderBestMatch() }

					<PartialUnderline className={ styles.suggestionTitle }>
						{ this.props.suggestion.domainName }
						{ this.renderPremiumTag() }
					</PartialUnderline>
					<div className={ styles.cost }>
						{ i18n.translate( '%(cost)s per year', {
							args: { cost }
						} ) }
					</div>
				</div>
				<div className={ styles.buyButton }>
					{ this.buttonText() }
				</div>

				{ this.renderSuggestionTakenMessage() }
			</li>
		);
	}
} );

export default withStyles( styles )( Suggestion );
