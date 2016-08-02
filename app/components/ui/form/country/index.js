// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';

// Internal dependencies
import FormSelect from 'components/ui/form/select';
import { removeInvalidInputProps } from 'lib/form';

const Country = ( { className, disabled, field, countries } ) => (
	<FormSelect
		{ ...removeInvalidInputProps( field ) }
		disabled={ disabled }
		className={ className }>
		<option value="" disabled>{ i18n.translate( 'Country' ) }</option>
		<option disabled />
		{ countries.hasLoadedFromServer && countries.data.map( ( country, index ) => (
			country.name
				? <option value={ country.code } key={ country.code }>{ country.name }</option>
				: <option value=" " key={ index } disabled />
		) ) }
	</FormSelect>
);

Country.propTypes = {
	className: PropTypes.string,
	countries: PropTypes.object.isRequired,
	disabled: PropTypes.bool.isRequired,
	field: PropTypes.object.isRequired
};

export default Country;
