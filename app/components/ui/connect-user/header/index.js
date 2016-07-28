// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

const Header = ( { intention } ) => {
	let heading = '';
	let text = '';

	if ( intention === 'signup' ) {
		heading = i18n.translate( 'Create an account' );
		text = i18n.translate( "Enter your email address to create an account. We'll send you a confirmation to get started." );
	} else if ( intention === 'verifyUser' ) {
		heading = i18n.translate( 'Time to check your email!' );
	}

	return (
		<div className={ styles.container }>
			<div className={ styles.header }>
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
	intention: PropTypes.string.isRequired
};

export default withStyles( styles )( Header );
