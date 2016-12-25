// External dependencies
import { bindHandlers } from 'react-bind-handlers';
import React, { PropTypes } from 'react';

// Internal dependencies
import { getCallingCode, formatPhoneWithInternationalDot, maskPhone } from 'lib/form';
import Input from 'components/ui/form/input';

const getFormattedPhone = ( phone, countryCode ) => formatPhoneWithInternationalDot( maskPhone( phone ), countryCode );

const isSingleCharacterMissing = ( first, second ) => {
	if ( ( first.length - 1 ) !== second.length ) {
		return false;
	}

	let missingCount = 0;
	for ( let i = 0; i < second.length; i++ ) {
		if ( first[ i ] !== second[ i - missingCount ] ) {
			missingCount++;

			if ( missingCount > 1 ) {
				return false;
			}
		}
	}

	return true;
};

class Phone extends React.Component {
	componentWillReceiveProps( nextProps ) {
		const {
			countryCode: currentCountryCode,
			field: {
				onChange: updatePhone
			},
			field
		} = this.props;
		const {
			countryCode: nextCountryCode
		} = nextProps;

		// The value will be held in either `value` or `initialValue` depending
		// on whether the form was just initialized
		const currentPhoneNumber = field.dirty ? field.value : field.initialValue;

		const currentFormattedNumber = getFormattedPhone( currentPhoneNumber, currentCountryCode );

		// If the current number don't match a formatted number,
		// lets replace it with the formatted version
		if ( currentPhoneNumber && currentFormattedNumber !== currentPhoneNumber ) {
			updatePhone( currentFormattedNumber );
			return;
		}

		// Adds a calling code to the phone field - upon country change - only if it is empty or if it contains the one
		// from the previous selected country
		if ( currentCountryCode !== nextCountryCode && nextCountryCode ) {
			const currentCallingCode = getFormattedPhone( getCallingCode( currentCountryCode ), currentCountryCode );

			if ( ! currentPhoneNumber || // no value at all
				currentPhoneNumber === currentCallingCode ) { // set to a prev. country code
				const nextCallingCode = getCallingCode( nextCountryCode );

				updatePhone( getFormattedPhone( nextCallingCode, nextCountryCode ) );
			}
		}
	}

	handleChange( event ) {
		const nextPhone = event.target.value;
		const nextCountryCode = this.props.countryCode;
		const currentPhone = this.props.field.value;

		// we allow user to delete a single character
		// or reset the field
		if ( nextPhone.length === 0 || isSingleCharacterMissing( currentPhone, nextPhone ) ) {
			return this.props.field.onChange( nextPhone );
		}

		const maskedPhone = maskPhone( nextPhone );

		return this.props.field.onChange( formatPhoneWithInternationalDot( maskedPhone, nextCountryCode ) );
	}

	render() {
		const { className, disabled, field, untouch } = this.props;

		return (
			<Input
				className={ className }
				disabled={ disabled }
				field={ field }
				onChange={ this.handleChange }
				type="tel"
				untouch={ untouch }
				dir="ltr"
			/>
		);
	}
}

Phone.propTypes = {
	className: PropTypes.string,
	countryCode: PropTypes.string,
	disabled: PropTypes.bool,
	field: PropTypes.object.isRequired,
	untouch: PropTypes.func.isRequired
};

export default bindHandlers( Phone );
