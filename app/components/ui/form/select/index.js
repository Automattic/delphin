// External dependencies
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import omit from 'lodash/omit';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

const FormSelect = ( props ) => {
	const classes = classNames( props.className, styles.formSelect );

	return (
		<select { ...omit( props, 'className' ) } className={ classes }>
			{ props.children }
		</select>
	);
};

FormSelect.propTypes = {
	children: PropTypes.array.isRequired,
	className: PropTypes.string,
};

export default withStyles( styles )( FormSelect );
