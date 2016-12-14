// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';

// Internal dependencies
import Select from 'components/ui/form/select';
import { removeInvalidInputProps } from 'lib/form';

const Country = ( { className, disabled, field, countries, dir } ) => (
	<Select
		{ ...removeInvalidInputProps( field ) }
		disabled={ disabled }
		dir={ dir }
		className={ className }
		required>
		<option value="">{ i18n.translate( 'Country' ) }</option>
		<option disabled />
		{ countries.hasLoadedFromServer && countries.data.map( ( country, index ) => (
			country.name
				? <option value={ country.code } key={ index }>{ country.name }</option>
				: <option value=" " key={ index } disabled />
		) ) }
	</Select>
);

Country.propTypes = {
	className: PropTypes.string,
	countries: PropTypes.object.isRequired,
	dir: PropTypes.string,
	disabled: PropTypes.bool.isRequired,
	field: PropTypes.object.isRequired
};

export default Country;
