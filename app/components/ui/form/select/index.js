// External dependencies
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import omit from 'lodash/omit';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { withErrorFocusable } from 'components/ui/form/error-focuser';

// Internal dependencies
import styles from './styles.scss';

const Select = props => {
	const classes = classNames( props.className, styles.formSelect );

	return (
		<select { ...omit( props, 'className' ) } className={ classes }>
			{ props.children }
		</select>
	);
};

Select.propTypes = {
	children: PropTypes.array.isRequired,
	className: PropTypes.string,
};

export default withErrorFocusable( withStyles( styles )( Select ) );
