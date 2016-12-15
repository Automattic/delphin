// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import Footer from 'components/ui/footer';
import NoticesContainer from 'components/containers/notices';
import PulsingDot from 'components/containers/pulsing-dot';
import styles from './styles.scss';

const Layout = ( { children, location } ) => {
	return (
		<div className={ styles.layout }>
			<div className={ styles.content }>
				{ children }
			</div>

			<PulsingDot />

			<NoticesContainer />

			<Footer location={ location } />
		</div>
	);
};

Layout.propTypes = {
	children: PropTypes.node.isRequired,
	location: PropTypes.object.isRequired,
};

export default withStyles( styles )( Layout );
