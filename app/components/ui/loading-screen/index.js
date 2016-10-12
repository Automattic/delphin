// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

const LoadingScreen = ( { message } ) => (
	<div className={ styles.container }>
		<img src="/images/rocket-launch-dark.svg"/>
		<h1 className={ styles.heading }>
			{ message || i18n.translate( "Let's get started…" ) }
		</h1>
	</div>
);

LoadingScreen.propTypes = {
	message: PropTypes.string
};

export default withStyles( styles )( LoadingScreen );
