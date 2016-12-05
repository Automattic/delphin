// External dependencies
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import LanguagePicker from 'components/containers/language-picker';
import Menu from 'components/ui/menu';
import styles from './styles.scss';

const Footer = () => {
	return (
		<div className={ styles.footer }>
			<Menu />

			<LanguagePicker />
		</div>
	);
};

export default withStyles( styles )( Footer );
