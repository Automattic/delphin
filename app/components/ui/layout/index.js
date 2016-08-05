// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import NoticesContainer from 'components/containers/notices';
import styles from './styles.scss';

const Layout = ( { children } ) => {
	return (
		<div className={ styles.layout }>
			{ children }

			<NoticesContainer />
		</div>
	);
};

Layout.propTypes = {
	children: PropTypes.node.isRequired
};

export default withStyles( styles )( Layout );
