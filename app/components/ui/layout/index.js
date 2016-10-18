// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import Footer from 'components/ui/footer';
import NoticesContainer from 'components/containers/notices';
import PulsingDot from 'components/containers/pulsing-dot';
import styles from './styles.scss';

const Layout = ( { children } ) => {
	return (
		<div className={ styles.layout }>
			{ children }

			<PulsingDot />

			<NoticesContainer />

			<Footer />
		</div>
	);
};

Layout.propTypes = {
	children: PropTypes.node.isRequired
};

export default withStyles( styles )( Layout );
