// External dependencies
import classNames from 'classnames';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import LanguagePicker from 'components/containers/language-picker';
import MenuContainer from 'components/containers/menu';
import styles from './styles.scss';

const Footer = ( { isDark } ) => {
	return (
		<div className={ classNames( styles.footer ) }>
			<MenuContainer />
			<LanguagePicker isDark={ isDark } />
		</div>
	);
};

Footer.propTypes = {
	isDark: PropTypes.bool
};

export default withStyles( styles )( Footer );
