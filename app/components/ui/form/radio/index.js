// External dependencies
import classNames from 'classnames';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import { removeInvalidInputProps } from 'lib/form';
import styles from './styles.scss';

const Radio = props => {
	const { className, ...otherProps } = props,
		newProps = removeInvalidInputProps( otherProps );

	return (
		<input
			type="radio"
			className={ classNames( className, styles.radio ) }
			{ ...newProps }
		/>
	);
};

Radio.propTypes = {
	className: PropTypes.string,
};

export default withStyles( styles )( Radio );
