// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import formStyles from 'components/ui/form/styles.scss';

const ValidationError = ( { field } ) => {
	return ( field.touched && field.error ? (
			<div className={ formStyles.validationError }>
				{ field.error }
			</div>
		) : null
	);
};

ValidationError.propTypes = {
	field: PropTypes.object.isRequired
};

export default withStyles( formStyles )( ValidationError );
