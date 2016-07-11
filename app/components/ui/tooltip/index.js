// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

const Tooltip = props => {
	const { children, text, ...rest } = props;

	return (
		<a className={ styles.tooltip } { ...rest }>
			{ children }

			<div className={ styles.text }>
				{ text }
			</div>
		</a>
	);
};

Tooltip.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	text: PropTypes.node.isRequired
};

export default withStyles( styles )( Tooltip );
