// External dependencies
import classNames from 'classnames';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

const Tag = ( { children, className, ...props } ) => {
	return (
		<span className={ classNames( styles.tag, className ) } { ...props }>
			{ children }
		</span>
	);
};

Tag.propTypes = {
	children: PropTypes.oneOfType( [
		PropTypes.arrayOf( PropTypes.node ),
		PropTypes.node
	] ).isRequired,
	className: PropTypes.string,
};

export default withStyles( styles )( Tag );
