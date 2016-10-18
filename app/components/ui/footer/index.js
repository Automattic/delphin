// External dependencies
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import LanguagePicker from 'components/containers/language-picker';
import MenuContainer from 'components/containers/menu';
import styles from './styles.scss';

const Footer = () => {
	return (
		<div className={ styles.footer }>
			<MenuContainer />

			<LanguagePicker />
		</div>
	);
};

export default withStyles( styles )( Footer );
