// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import config from 'config';
import styles from './styles.scss';
import TrackingLink from 'components/containers/tracking-link';

const Menu = () => {
	return (
		<menu className={ styles.menu }>
			<TrackingLink eventName="delphin_footer_link_click" eventParams={ { link_clicked: 'learn_more' } } className={ styles.link } to="https://dotblog.wordpress.com">{ i18n.translate( 'Learn More' ) }</TrackingLink>
			<TrackingLink eventName="delphin_footer_link_click" eventParams={ { link_clicked: 'support' } } className={ styles.link } to={ config( 'support_link' ) }>{ i18n.translate( 'Support' ) }</TrackingLink>
			<TrackingLink eventName="delphin_footer_link_click" eventParams={ { link_clicked: 'term_of_use' } } className={ styles.link } to="https://wordpress.com/automattic-domain-name-registration-agreement/">{ i18n.translate( 'Terms of Use' ) }</TrackingLink>
			<TrackingLink eventName="delphin_footer_link_click" eventParams={ { link_clicked: 'wordpress' } } className={ styles.link } to="https://wordpress.com">{ i18n.translate( 'A WordPress.com Service' ) }</TrackingLink>
		</menu>
	);
};

Menu.propTypes = {
	isLoggedIn: PropTypes.bool.isRequired,
	logoutUser: PropTypes.func.isRequired
};

export default withStyles( styles )( Menu );
