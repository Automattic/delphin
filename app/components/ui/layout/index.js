// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

const Layout = ( { children } ) => {
	return (
		<div className={ styles.layout }>
			<div className={ styles.content }>
				{ children }
			</div>
		</div>
	);
};

Layout.propTypes = {
	children: PropTypes.node.isRequired
};

export default withStyles( styles )( Layout );
