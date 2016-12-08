// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import formStyles from 'components/ui/form/styles.scss';

/**
 * Determines if `ValidationError` is visible. Returns false if:
 * - `errors` is empty
 * - `fields` contains no touched fields.
 * - `fields` contains only empty fields and `submitFailed` is present and false.
 *
 * @param {array} fields - List of fields.
 * @param {array} errors - List of errors.
 * @param {boolean|undefined} submitFailed - Optional flag for whether the form was
 * submitted and failed validation.
 * @return {boolean} - Whether or not to display `ValidationError`.
 */
const isVisible = ( fields, errors, submitFailed ) => {
	if ( errors.length === 0 ) {
		return false;
	}

	if ( ! fields.some( field => field.touched ) && ! submitFailed ) {
		return false;
	}

	const allFieldsAreEmpty = ! fields.some( field => field.value );

	if ( allFieldsAreEmpty && typeof submitFailed === 'boolean' && ! submitFailed ) {
		return false;
	}

	return true;
};

const ValidationError = ( { field, fields, submitFailed } ) => {
	let allFields;

	if ( Array.isArray( fields ) ) {
		allFields = fields;
	}

	if ( field ) {
		allFields = [ field ];
	}

	let errors = allFields.reduce( ( result, currentField ) => {
		if ( ! currentField.touched && ! submitFailed ) {
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

	return isVisible( allFields, errors, submitFailed ) ? (
			<div className={ formStyles.validationError }>
				{ errorsMarkup }
			</div>
		) : null;
};

ValidationError.propTypes = {
	field: PropTypes.object,
	fields: PropTypes.array,
	submitFailed: PropTypes.bool
};

export default withStyles( formStyles )( ValidationError );
