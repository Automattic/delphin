// External dependencies
import React, { PropTypes } from 'react';

// Internal dependencies
import Input from 'components/ui/form/input';
import { removeInvalidInputProps } from 'lib/form';

export const emailValidator = '^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$';

class Email extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			// in case the app has not loaded yet, add a simple validation for the domain field
			inputPattern: emailValidator
		};
	}

	componentDidMount() {
		// once the app loaded, redux form validation handles this
		this.setState( { inputPattern: null } ); /* eslint react/no-did-mount-set-state: 0 */
	}

	render() {
		const { className, inputClassName, ...inputProps } = this.props;

		return (
			<Input
				className={ className }
				inputClassName={ inputClassName }
				pattern={ this.state.inputPattern }
				{ ...removeInvalidInputProps( inputProps ) }
			/>
		);
	}
}

Email.propTypes = {
	className: PropTypes.string,
	field: PropTypes.object,
	inputClassName: PropTypes.string
};

export default Email;
