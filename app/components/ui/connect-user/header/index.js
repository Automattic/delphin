// External dependencies
import classNames from 'classnames';
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

const Header = ( { intention } ) => {
	let heading = '';
	let text = '';

	if ( intention === 'signup' || intention === 'login' ) {
		heading = i18n.translate( 'We\'re making some changes' );
	} else if ( intention === 'verifyUser' ) {
		heading = i18n.translate( 'Check your email' );

		text = i18n.translate( 'We sent you a special link to confirm your email address. ' +
			'Look for an email from get.blog and click the link to continue.' );
	}

	return (
		<div className={ styles.container }>
			<div className={ classNames( styles.header, { [ styles.logInHeader ]: intention === 'login' || intention === 'signup' } ) }>
				{ heading && (
					<h2 className={ styles.heading }>
						{ heading }
					</h2>
				) }

				{ text && (
					<p className={ styles.text }>
						{ text }
					</p>
				) }
			</div>
		</div>
	);
};

Header.propTypes = {
	domainName: PropTypes.string,
	intention: PropTypes.string.isRequired
};

export default withStyles( styles )( Header );
