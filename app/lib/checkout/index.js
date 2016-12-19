// External dependencies
import i18n from 'i18n-calypso';
import { card, cvc } from 'creditcards';

export const validateCheckoutForm = values => {
	const errors = {};

	if ( ! values.name ) {
		errors.name = i18n.translate( 'Enter your name as it is on your card.' );
	}

	if ( ! values.number ) {
		errors.number = i18n.translate( 'Enter your credit card number.' );
	}

	if ( ! values.cvv ) {
		errors.cvv = i18n.translate( 'Enter your security code (CVV).' );
	}

	if ( ! values.postalCode ) {
		errors.postalCode = i18n.translate( 'Enter your postal code.' );
	}

	if ( ! values.expirationMonth ) {
		errors.expirationMonth = i18n.translate( 'Choose the expiration month from the list.' );
	}

	if ( ! values.expirationYear ) {
		errors.expirationYear = i18n.translate( 'Choose the expiration year from the list.' );
	}

	if ( ! values.countryCode ) {
		errors.countryCode = i18n.translate( 'Choose your country from the list.' );
	}

	if ( ! errors.number && ! card.isValid( card.parse( values.number ) ) ) {
		errors.number = i18n.translate( 'Enter your number as it is on your card.' );
	}

	if ( ! errors.cvv && ! cvc.isValid( values.cvv ) ) {
		errors.cvv = i18n.translate( 'Enter your security code as it is on your card.' );
	}

	return errors;
};

export const normalizeContactInformation = contactInformation => (
	{
		...contactInformation,
		postalCode: contactInformation.postalCode ? contactInformation.postalCode.toUpperCase() : ''
	}
);
