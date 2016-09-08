// External dependencies
import { bindHandlers } from 'react-bind-handlers';
import classNames from 'classnames';
const Gridicon = require( '@automattic/dops-components/client/components/gridicon' );
import find from 'lodash/find';
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import config from 'config';
import { getPath } from 'routes';
import Select from 'components/ui/form/select';
import styles from './styles.scss';

class LanguagePicker extends React.Component {
	getCurrentLanguage() {
		return find( config( 'languages' ), { langSlug: i18n.getLocaleSlug() } );
	}

	handleChange( event ) {
		const locale = event.target.value;
		const currentLanguage = this.getCurrentLanguage();
		const nextLanguage = find( config( 'languages' ), { langSlug: locale } );

		if ( currentLanguage.isRtl !== nextLanguage.isRtl ) {
			// RTL and LTR languages use a different build, so we need to
			// reload the page if the language direction changes
			window.location.href = getPath( 'home', {}, { locale } );
		} else {
			this.props.switchLocale( locale );
			this.props.hideSelect();
		}
	}

	render() {
		const languages = config( 'languages' );
		const { isDark, isSelectVisible, showSelect } = this.props;
		const currentLanguage = this.getCurrentLanguage();

		let content;
		if ( isSelectVisible ) {
			content = (
				<Select className={ styles.select } onChange={ this.handleChange } defaultValue="">
					<option value="" disabled>{ i18n.translate( 'Select a language' ) }</option>
					{ languages.map( ( { langSlug, name } ) => (
						<option value={ langSlug } key={ langSlug }>{ name }</option>
					) ) }
				</Select>
			);
		} else {
			content = (
				<div className={ styles.currentLanguage } onClick={ showSelect }>
					{ currentLanguage && currentLanguage.name }
					<Gridicon icon="globe" size={ 16 } />
				</div>
			);
		}

		const classes = classNames( styles.container, isDark ? styles.isDark : null );
		return (
			<div className={ classes }>
				{ content }
			</div>
		);
	}
}

LanguagePicker.propTypes = {
	hideSelect: PropTypes.func.isRequired,
	isDark: PropTypes.bool,
	isSelectVisible: PropTypes.bool.isRequired,
	showSelect: PropTypes.func.isRequired,
	switchLocale: PropTypes.func.isRequired,
};

export default withStyles( styles )( bindHandlers( LanguagePicker ) );
