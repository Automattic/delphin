// External dependencies
import classNames from 'classnames';
import { bindHandlers } from 'react-bind-handlers';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import { getCallingCode, guessCallingCode, maskPhone } from 'lib/form';
import Input from 'components/ui/form/input';
import styles from './styles.scss';

class Phone extends React.Component {
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

		const normalizedNextPhoneNumber = nextPhoneNumber.replace( '+', '' ).replace( '.', '' );

		if ( ! currentPhoneNumber && nextPhoneNumber ) {
			// If the new phone number given does not contain a . after the country code, let's try to add it.
			// Also, adds a + prefix if . is present but + is missing

			const callingCode = guessCallingCode( nextPhoneNumber, nextCountryCode );
			const numberPart = callingCode
					? nextPhoneNumber.replace( new RegExp( '\\+?' + callingCode + '\\.?' ), '' )
					: normalizedNextPhoneNumber;
			updatePhone( maskPhone( callingCode + '.' + numberPart ) );
		} else if ( currentCountryCode !== nextCountryCode ) {
			// Adds a calling code to the phone field - upon country change - only
			// if it is empty or if it contains the one from the previous selected country

			const countryCallingCode = getCallingCode( currentCountryCode );

			if ( ! normalizedNextPhoneNumber || normalizedNextPhoneNumber === countryCallingCode ) {
				const nextCountryCallingCode = getCallingCode( nextCountryCode );

				updatePhone( maskPhone( nextCountryCallingCode + '.' ) );
			}
		}
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
					onChange={ this.handleCountryCallingCodeChange }
					maxLength={ 8 }
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
