// External dependencies
import classNames from 'classnames';
import React from 'react';
import omit from 'lodash/omit';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

const Tooltip = props => {
	const { children, text } = props,
		newProps = omit( props, 'className' ),
		className = classNames( props.className, styles.tooltip );

	return (
		<a className={ className } { ...newProps }>
			{ children }
			<div className={ styles.text }>
				{ text }
			</div>
		</a>
	);
};

export default withStyles( styles )( Tooltip );
