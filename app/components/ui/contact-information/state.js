// External dependencies
import i18n from 'i18n-calypso';
import isEmpty from 'lodash/isEmpty';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import Input from 'components/ui/form/input';
import { removeInvalidInputProps } from 'lib/form';
import styles from './styles.scss';

const State = ( { disabled, field, states, onBlur } ) => {
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
		<div className={ styles.state }>{ content }</div>
	);
};

State.propTypes = {
	disabled: PropTypes.bool.isRequired,
	field: PropTypes.object.isRequired,
	onBlur: PropTypes.func,
	states: PropTypes.object.isRequired
};

export default withStyles( styles )( State );
