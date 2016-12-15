// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import LanguagePicker from 'components/containers/language-picker';
import Menu from 'components/ui/menu';
import styles from './styles.scss';

const Footer = ( { location } ) => {
	return (
		<div className={ styles.footer }>
			<Menu location={ location } />

			<LanguagePicker />
		</div>
	);
};

Footer.propTypes = {
	location: PropTypes.object.isRequired,
};

export default withStyles( styles )( Footer );
