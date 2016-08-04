// External dependencies
import classNames from 'classnames';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import LanguagePicker from 'components/containers/language-picker';
import MenuContainer from 'components/containers/menu';
import styles from './styles.scss';

const Footer = ( { languagePickerClassName } ) => {
	return (
		<div className={ classNames( styles.footer ) }>
			<MenuContainer />
			<LanguagePicker className={ languagePickerClassName } />
		</div>
	);
};

Footer.propTypes = {
	languagePickerClassName: PropTypes.string
};

export default withStyles( styles )( Footer );
