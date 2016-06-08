// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import formStyles from 'components/ui/form/styles.scss';

const ValidationError = ( { field } ) => {
	let errors;

	if ( typeof field.error === 'string' ) {
		errors = field.error;
	}

	if ( typeof field.error === 'object' ) {
		errors = (
			<ul>
				{ field.error.data.map( error => <li key={ error }>{ error }</li> ) }
			</ul>
		);
	}

	return ( field.touched && field.error ? (
			<div className={ formStyles.validationError }>
				{ errors }
			</div>
		) : null
	);
};

ValidationError.propTypes = {
	field: PropTypes.object.isRequired
};

export default withStyles( formStyles )( ValidationError );
