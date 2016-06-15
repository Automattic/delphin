// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import formStyles from 'components/ui/form/styles.scss';

const ValidationError = ( { field, fields } ) => {
	let allFields;

	if ( Array.isArray( fields ) ) {
		allFields = fields;
	}

	if ( field ) {
		allFields = [ field ];
	}

	let errors = allFields.reduce( ( result, currentField ) => {
		if ( ! currentField.touched ) {
			return result;
		}

		if ( typeof currentField.error === 'string' ) {
			return result.concat( currentField.error );
		}

		if ( typeof currentField.error === 'object' ) {
			return result.concat( currentField.error.data );
		}

		return result;
	}, [] );

	let errorsMarkup;

	if ( errors.length === 1 ) {
		errorsMarkup = errors[ 0 ];
	} else {
		errorsMarkup = (
			<ul>
				{ errors.map( error => (
					<li key={ error }>
						<div className={ formStyles.arrow }>
							{ '\u25B8' }
						</div>
						{ error }
					</li>
				) ) }
			</ul>
		);
	}

	return ( allFields.some( currentField => currentField.touched ) && errors.length > 0 ? (
			<div className={ formStyles.validationError }>
				{ errorsMarkup }
			</div>
		) : null
	);
};

ValidationError.propTypes = {
	field: PropTypes.object,
	fields: PropTypes.array
};

export default withStyles( formStyles )( ValidationError );
