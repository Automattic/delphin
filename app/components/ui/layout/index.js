// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import some from 'lodash/some';

// Internal dependencies
import NoticesContainer from 'components/containers/notices';
import PulsingDot from 'components/containers/pulsing-dot';
import styles from './styles.scss';

const LIGHT_COMPONENT_SLUGS = {
	learnMore: true
};

let lastBodyClass = null;
const setBodyClass = ( className ) => {
	// Avoid touching the DOM when unnecessary
	if ( lastBodyClass === className ) {
		return;
	}

	document.body.className = className;
};

const Layout = ( { routes, children } ) => {
	const isLightRoute = some( routes, route => LIGHT_COMPONENT_SLUGS[ route.slug ] );

	// Side effect to change body background color
	setBodyClass( isLightRoute ? styles.light : styles.dark );

	return (
		<div className={ styles.layout }>
			<PulsingDot />

			{ children }

			<NoticesContainer />
		</div>
	);
};

Layout.propTypes = {
	children: PropTypes.node.isRequired,
	routes: PropTypes.array.isRequired
};

export default withStyles( styles )( Layout );
