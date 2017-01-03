// External dependencies
import classNames from 'classnames';
import { bindHandlers } from 'react-bind-handlers';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import { getCallingCode, maskPhone } from 'lib/form';
import Input from 'components/ui/form/input';
import styles from './styles.scss';

class Phone extends React.Component {
	componentWillReceiveProps( nextProps ) {
		const {
			countryCode: currentCountryCode,
			field: {
				onChange: updatePhone
			}
		} = this.props;
		const {
			countryCode: nextCountryCode,
			field: {
				value: nextPhoneNumber
			}
		} = nextProps;

		// Adds a calling code to the phone field - upon country change - only if it is empty or if it contains the one
		// from the previous selected country
		if ( currentCountryCode !== nextCountryCode ) {
			const currentCallingCode = getCallingCode( currentCountryCode );
			const normalizedNextPhoneNumber = nextPhoneNumber.replace( '+', '' ).replace( '.', '' );

			if ( ! normalizedNextPhoneNumber || normalizedNextPhoneNumber === currentCallingCode ) {
				const nextCallingCode = getCallingCode( nextCountryCode );

				updatePhone( maskPhone( nextCallingCode ) );
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
					type="text"
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
