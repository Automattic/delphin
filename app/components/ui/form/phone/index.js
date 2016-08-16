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
				onChange: updatePhone
			}
		} = this.props;
		const { field } = this.props;
		// The value will be held in either `value` or `initialValue` depending
		// on whether the form was just initialized
		const currentPhoneNumber = field.value || field.initialValue;
		const {
			countryCode: nextCountryCode
		} = nextProps;

		// Adds a calling code to the phone field - upon country change - only if it is empty or if it contains the one
		// from the previous selected country
		if ( currentCountryCode !== nextCountryCode ) {
			const currentCallingCode = getCallingCode( currentCountryCode );

			if ( ! currentPhoneNumber || currentPhoneNumber === maskPhone( currentCallingCode ) ) {
				const nextCallingCode = getCallingCode( nextCountryCode );

				updatePhone( maskPhone( nextCallingCode ) );
			}
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
