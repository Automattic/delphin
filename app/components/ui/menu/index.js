// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import { getPath } from 'routes';
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

const Menu = () => {
	return (
		<menu className={ styles.menu }>
			<Link to={ getPath( 'learnMore' ) }>
				{ i18n.translate( 'Support' ) }
			</Link>

			<Link to="https://automattic.com/privacy/">
				{ i18n.translate( 'Privacy Policy' ) }
			</Link>

			<Link to="https://wordpress.com">
				{ i18n.translate( 'A WordPress.com Service' ) }
			</Link>
		</menu>
	);
};

export default withStyles( styles )( Menu );
