// External dependencies
import classNames from 'classnames';
import i18n from 'i18n-calypso';
import isEmpty from 'lodash/isEmpty';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

const State = ( { disabled, field, states, onBlur, className } ) => {
	if ( ! states.hasLoadedFromServer ) {
		return (
			<input
				onBlur={ onBlur }
				className={ classNames( styles.state, className ) }
				placeholder={ i18n.translate( 'State' ) }
				disabled
			/>
		);
	}

	if ( states.hasLoadedFromServer && isEmpty( states.data ) ) {
		return (
			<input
				{ ...field }
				onBlur={ onBlur }
				className={ classNames( styles.state, className ) }
				disabled={ disabled }
				placeholder={ i18n.translate( 'State' ) } />
		);
	}

	return (
		<select
			{ ...field }
			onBlur={ onBlur }
			className={ classNames( styles.state, className ) }
			disabled={ disabled }>
			<option value="" disabled>{ i18n.translate( 'State' ) }</option>
			<option disabled />
			{ states.data.map( ( state ) => (
				<option value={ state.code } key={ state.code }>{ state.name }</option>
			) ) }
		</select>
	);
};

State.propTypes = {
	className: PropTypes.string,
	disabled: PropTypes.bool.isRequired,
	field: PropTypes.object.isRequired,
	onBlur: PropTypes.func,
	states: PropTypes.object.isRequired
};

export default withStyles( styles )( State );
