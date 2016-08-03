// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import LanguagePicker from 'components/containers/language-picker';
import MenuContainer from 'components/containers/menu';
import NoticesContainer from 'components/containers/notices';
import styles from './styles.scss';

const Layout = ( { children } ) => {
	return (
		<div className={ styles.layout }>
			<div className={ styles.content }>
				{ children }
			</div>

			<NoticesContainer />

			<div className={ styles.footer }>
				<MenuContainer />
				<LanguagePicker />
			</div>
		</div>
	);
};

Layout.propTypes = {
	children: PropTypes.node.isRequired
};

export default withStyles( styles )( Layout );
