// External dependencies
import classNames from 'classnames';
import { bindHandlers } from 'react-bind-handlers';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import { getCallingCode, guessCallingCode, maskPhone } from 'lib/form';
import Input from 'components/ui/form/input';
import styles from './styles.scss';

const normalizePhoneNumber = phoneNumber => phoneNumber.replace( '+', '' ).replace( '.', '' );

class Phone extends React.Component {
	componentWillMount() {
		const {
			countryCode,
			field: {
				value: phoneNumber
			},
		} = this.props;

		if ( phoneNumber ) {
			this.updatePhoneNumberWithCountryCallingCode( phoneNumber, countryCode );
		}
	}

	componentWillReceiveProps( nextProps ) {
		const {
			countryCode: currentCountryCode,
			field: {
				value: currentPhoneNumber,
				onChange: updatePhone
			}
		} = this.props;
		const {
			countryCode: nextCountryCode,
			field: {
				value: nextPhoneNumber
			}
		} = nextProps;

		if ( ! currentPhoneNumber && nextPhoneNumber.length > 3 ) {
			// The user likely either pasted a phone number or it just loaded from the server
			this.updatePhoneNumberWithCountryCallingCode( nextPhoneNumber, nextCountryCode );
		} else if ( currentCountryCode !== nextCountryCode ) {
			// Updates the country calling code in the phone field upon country
			// change if it is empty or if it contains the one from the
			// previous selected country

			const countryCallingCode = getCallingCode( currentCountryCode );
			const normalizedNextPhoneNumber = normalizePhoneNumber( nextPhoneNumber );

			if ( ! normalizedNextPhoneNumber || normalizedNextPhoneNumber === countryCallingCode ) {
				const nextCountryCallingCode = getCallingCode( nextCountryCode );

				updatePhone( maskPhone( nextCountryCallingCode + '.' ) );
			}
		}
	}

	/**
	 * Ensures that the initial phone number contains a period after the
	 * country calling code if none is present. This is necessary because we
	 * used to store phone numbers without a period separating the country
	 * calling code from the rest of the number.
	 *
	 * @param {string} phoneNumber - phone number
	 * @param {string} countryCode - country code (e.g. FR)
	 */
	updatePhoneNumberWithCountryCallingCode( phoneNumber, countryCode ) {
		const countryCallingCode = guessCallingCode( phoneNumber, countryCode );

		let localNumberSection;

		if ( countryCallingCode ) {
			localNumberSection = phoneNumber.replace( new RegExp( '\\+?' + countryCallingCode + '\\.?' ), '' );
		} else {
			localNumberSection = normalizePhoneNumber( phoneNumber );
		}

		this.props.field.onChange( maskPhone( countryCallingCode + '.' + localNumberSection ) );
	}

	getCountryCallingCode() {
		return this.props.field.value.split( '.' )[ 0 ] || '';
	}

	getPhoneNumber() {
		return this.props.field.value.split( '.' )[ 1 ] || '';
	}

	handleChange( countryCallingCode, phoneNumber ) {
		let newPhoneNumber = countryCallingCode;

		if ( phoneNumber ) {
			newPhoneNumber += '.' + phoneNumber;
		}

		return this.props.field.onChange( maskPhone( newPhoneNumber, this.props.field.value ) );
	}

	handleCountryCallingCodeChange( event ) {
		return this.handleChange( event.target.value, this.getPhoneNumber() );
	}

	handlePhoneNumberChange( event ) {
		return this.handleChange( this.getCountryCallingCode(), event.target.value );
	}

	handleBlur() {
		return this.props.field.onBlur( this.props.field.value );
	}

	render() {
		const { className, disabled, field, untouch } = this.props;

		return (
			<div className={ styles.phoneContainer }>
				<Input
					field={ {
						...field,
						value: this.getCountryCallingCode(),
						onBlur: this.handleBlur
					} }
					className={ styles.callingCode }
					inputClassName={ styles.callingCodeInput }
					onChange={ this.handleCountryCallingCodeChange }
				/>
				<Input
					className={ classNames( className, styles.phoneNumber ) }
					disabled={ disabled }
					field={ {
						...field,
						value: this.getPhoneNumber(),
						onBlur: this.handleBlur
					} }
					onChange={ this.handlePhoneNumberChange }
					type="tel"
					untouch={ untouch }
					dir="ltr"
				/>
			</div>
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

export default withStyles( styles )( bindHandlers( Phone ) );
