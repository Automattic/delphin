// External dependencies
import { bindHandlers } from 'react-bind-handlers';
import React, { PropTypes } from 'react';

// Internal dependencies
import { getCallingCode, maskPhone } from 'lib/form';
import Input from 'components/ui/form/input';

class Phone extends React.Component {
	componentWillReceiveProps( nextProps ) {
		const {
			countryCode: currentCountryCode,
			field: {
				onChange: updatePhone,
				value: currentPhoneNumber,
				initialValue: currentIntialPhoneNumber,
				dirty: currentPhoneNumberDirty
			}
		} = this.props;

		const {
			countryCode: nextCountryCode
		} = nextProps;

		const canUpdatePhoneField = ( currentPhoneNumberDirty && ! currentPhoneNumber ) || // field is changed and empty
			( ! currentPhoneNumberDirty && ! currentIntialPhoneNumber ) || // field not changed and initial value is empty
			// field was changed, but it's current value is some country code, so we can change it
			( currentPhoneNumberDirty && ( currentPhoneNumber === maskPhone( getCallingCode( currentCountryCode ) ) ) );

		// Adds a calling code to the phone field - upon country change - only if it is empty or if it contains the one
		// from the previous selected country
		if ( canUpdatePhoneField && currentCountryCode !== nextCountryCode ) {
			updatePhone( maskPhone( getCallingCode( nextCountryCode ) ) );
		}
	}

	handleChange( event ) {
		return this.props.field.onChange( maskPhone( event.target.value, this.props.field.value ) );
	}

	render() {
		const { className, disabled, field, onBlur, untouch } = this.props;

		return (
			<Input
				className={ className }
				disabled={ disabled }
				field={ field }
				onBlur={ onBlur }
				onChange={ this.handleChange }
				untouch={ untouch } />
		);
	}
}

Phone.propTypes = {
	className: PropTypes.string,
	countryCode: PropTypes.string,
	disabled: PropTypes.bool,
	field: PropTypes.object.isRequired,
	onBlur: PropTypes.func.isRequired,
	untouch: PropTypes.func.isRequired
};

export default bindHandlers( Phone );
