// External dependencies
import i18n from 'i18n-calypso';
import isEmpty from 'lodash/isEmpty';
import classNames from 'classnames';
import React, { PropTypes } from 'react';

// Internal dependencies
import Input from 'components/ui/form/input';
import { removeInvalidInputProps } from 'lib/form';

const State = ( { className, disabled, field, states, onBlur } ) => {
	let content;

	if ( ! states.hasLoadedFromServer || isEmpty( states.data ) ) {
		content = (
			<Input
				field={ field }
				disabled={ ! states.hasLoadedFromServer || disabled }
				onBlur={ onBlur }
				placeholder={ i18n.translate( 'State' ) } />
		);
	} else {
		content = (
			<select
				{ ...removeInvalidInputProps( field ) }
				onBlur={ onBlur }
				disabled={ disabled }>
				<option value="" disabled>{ i18n.translate( 'State' ) }</option>
				<option disabled />
				{ states.data.map( ( state ) => (
					<option value={ state.code } key={ state.code }>{ state.name }</option>
				) ) }
			</select>
		);
	}

	return (
		<div className='state'>{ content }</div>
	);
};

State.propTypes = {
	className: PropTypes.string,
	disabled: PropTypes.bool.isRequired,
	field: PropTypes.object.isRequired,
	onBlur: PropTypes.func,
	states: PropTypes.object.isRequired
};

export default State;
