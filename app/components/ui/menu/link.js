// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';
import TrackingLink from 'components/containers/tracking-link';

const Link = ( { children, to } ) => {
	return (
		<TrackingLink eventName="delphin_footer_link_click" className={ styles.link } to={ to }>
			{ children }
		</TrackingLink>
	);
};

Link.propTypes = {
	children: PropTypes.node.isRequired,
	to: PropTypes.string.isRequired
};

export default withStyles( styles )( Link );
