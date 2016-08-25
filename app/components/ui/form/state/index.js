// External dependencies
import i18n from 'i18n-calypso';
import isEmpty from 'lodash/isEmpty';
import classNames from 'classnames';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import Select from 'components/ui/form/select';
import Input from 'components/ui/form/input';
import { removeInvalidInputProps } from 'lib/form';
import styles from './styles.scss';

const State = ( { className, disabled, field, states } ) => {
	let content;

	if ( ! states.hasLoadedFromServer || isEmpty( states.data ) ) {
		content = (
			<Input
				field={ field }
				disabled={ ! states.hasLoadedFromServer || disabled }
				placeholder={ i18n.translate( 'State/Province' ) } />
		);
	} else {
		content = (
			<Select
				{ ...removeInvalidInputProps( field ) }
				disabled={ disabled }>
				<option value="" disabled>{ i18n.translate( 'State/Province' ) }</option>
				<option disabled />
				{ states.data.map( ( state ) => (
					<option value={ state.code } key={ state.code }>{ state.name }</option>
				) ) }
			</Select>
		);
	}

	return (
		<div className={ classNames( className, styles.state ) }>{ content }</div>
	);
};

State.propTypes = {
	className: PropTypes.string,
	disabled: PropTypes.bool.isRequired,
	field: PropTypes.object.isRequired,
	states: PropTypes.object.isRequired
};

export default withStyles( styles )( State );
