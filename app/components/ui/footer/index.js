// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import LanguagePicker from 'components/containers/language-picker';
import MenuContainer from 'components/containers/menu';
import NoticesContainer from 'components/containers/notices';
import styles from './styles.scss';

const Footer = ( { context } ) => {
	return (
		<div>
			<NoticesContainer />

			<div className={ styles.footer }>
				<MenuContainer />
				<LanguagePicker context={ context } />
			</div>
		</div>
	);
};

export default withStyles( styles )( Footer );