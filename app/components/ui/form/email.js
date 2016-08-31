// External dependencies
import React, { PropTypes } from 'react';

// Internal dependencies
import Input from 'components/ui/form/input';
import { emailValidator, removeInvalidInputProps } from 'lib/form';

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
		const { className, inputClassName, gridIconSize, ...inputProps } = this.props;

		return (
			<Input
				className={ className }
				inputClassName={ inputClassName }
				gridIconSize={ gridIconSize }
				pattern={ this.state.inputPattern }
				{ ...removeInvalidInputProps( inputProps ) }
			/>
		);
	}
}

Email.propTypes = {
	className: PropTypes.string,
	field: PropTypes.object,
	gridIconSize: PropTypes.number,
	inputClassName: PropTypes.string
};

export default Email;
