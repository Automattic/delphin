// External dependencies
import classNames from 'classnames';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import LanguagePicker from 'components/containers/language-picker';
import MenuContainer from 'components/containers/menu';
import styles from './styles.scss';

const Footer = ( { hasBorder, isDark } ) => {
	return (
		<div className={ classNames( styles.footer, { [ styles.hasBorder ]: hasBorder } ) }>
			<MenuContainer />
			<LanguagePicker isDark={ isDark } />
		</div>
	);
};

Footer.propTypes = {
	hasBorder: PropTypes.bool,
	isDark: PropTypes.bool
};

export default withStyles( styles )( Footer );