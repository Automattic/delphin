// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import { getPath } from 'routes';
import styles from './styles.scss';
import Link from './link';
import SessionLinks from 'components/containers/session-links';

const Menu = ( { location } ) => {
	return (
		<menu className={ styles.menu }>
			<SessionLinks location={ location } />

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

Menu.propTypes = {
	location: PropTypes.object.isRequired,
};

export default withStyles( styles )( Menu );
