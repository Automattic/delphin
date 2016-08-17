// External dependencies
import i18n from 'i18n-calypso';
import creditcards from 'creditcards';

export const validateCheckoutForm = values => {
	const errors = {};

	if ( ! values.name ) {
		errors.push( {
			field: 'name',
			errorMessage: i18n.translate( 'Enter your name as it is on your card.' ),
			error: 'missing_name'
		} );
	}

	if ( ! values.number ) {
		errors.push( {
			field: 'number',
			errorMessage: i18n.translate( 'Enter your credit card number.' ),
			error: 'missing_cc_number'
		} );
	}

	if ( ! values.cvv ) {
		errors.push( {
			field: 'cvv',
			errorMessage: i18n.translate( 'Enter your security code (CVV).' ),
			error: 'missing_cc_cvv'
		} );
	}

	if ( ! values.postalCode ) {
		errors.push( {
			field: 'postalCode',
			errorMessage: i18n.translate( 'Enter your postal code.' ),
			error: 'missing_postal_code'
		} );
	}

	if ( ! values.expirationMonth ) {
		errors.push( {
			field: 'expirationMonth',
			errorMessage: i18n.translate( 'Choose the expiration month from the list.' ),
			error: 'missing_expiration_month'
		} );
	}

	if ( ! values.expirationYear ) {
		errors.push( {
			field: 'expirationYear',
			errorMessage: i18n.translate( 'Choose the expiration year from the list.' ),
			error: 'missing_expiration_year'
		} );
	}

	if ( ! values.countryCode ) {
		errors.push( {
			field: 'countryCode',
			errorMessage: i18n.translate( 'Choose your country from the list.' ),
			error: 'missing_country_code'
		} );
	}

	const cardErrors = creditcards.validate( {
		number: values.number,
		expirationMonth: values.expirationMonth,
		expirationYear: values.expirationYear,
		cvc: values.cvv
	} );

	if ( ! errors.number && ! cardErrors.validCardNumber ) {
		errors.push( {
			field: 'number',
			errorMessage: i18n.translate( 'Enter your number as it is on your card.' ),
			error: 'bad_cc_number'
		} );
	}

	if ( ! errors.cvv && ! cardErrors.validCvc ) {
		errors.push( {
			field: 'cvv',
			errorMessage: i18n.translate( 'Enter your security code as it is on your card.' ),
			error: 'bad_cc_cvv'
		} );
	}

	return errors;
};
