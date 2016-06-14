// External dependencies
import classNames from 'classnames';
const Gridicon = require( '@automattic/dops-components/client/components/gridicon' );
import omit from 'lodash/omit';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

const Input = props => {
	const { field } = props,
		className = classNames( props.className, styles.inputContainer ),
		isInvalid = field.touched && field.error,
		inputClassName = classNames( styles.input, {
			[ styles.hasError ]: isInvalid
		} ),
		newProps = omit( props, [ 'field', 'className' ] );

	return (
		<div className={ className }>
			<input
				className={ inputClassName }
				{ ...field }
				{ ...newProps }
			/>
			{ isInvalid && (
				<Gridicon className={ styles.gridicon } icon="cross" size={ 16 } />
			) }
		</div>
	);
};

Input.propTypes = {
	field: PropTypes.object.isRequired
};

export default withStyles( styles )( Input );
