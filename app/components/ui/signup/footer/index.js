// External dependencies
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import i18n from 'lib/i18n';
import styles from './styles.scss';
import Tooltip from 'components/ui/tooltip';

const Footer = () => {
	return (
		<div className={ styles.footer }>
			<Tooltip
				className={ styles.link }
				href="https://wordpress.com"
				target="_blank"
				text={ i18n.translate( 'Your account will be linked with a new or existing account on WordPress.com.' ) }>
				{ i18n.translate( 'Powered by WordPress.com' ) }
			</Tooltip>
		</div>
	);
};

export default withStyles( styles )( Footer );
