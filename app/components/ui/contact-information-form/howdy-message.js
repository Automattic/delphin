// External dependencies
import i18n from 'i18n-calypso';
import md5 from 'md5';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

const HowdyMessage = ( { email, firstName } ) => (
	<div className={ styles.howdyMessage }>
		{ email && (
			<img src={ 'https://www.gravatar.com/avatar/' + md5( email.toLowerCase() ) + '?s=20&d=blank' } />
		) }

		{ i18n.translate( 'Howdy %(firstName)s!', {
			args: { firstName }
		} ) }
	</div>
);

HowdyMessage.propTypes = {
	email: PropTypes.string.isRequired,
	firstName: PropTypes.string.isRequired,
};

export default withStyles( styles )( HowdyMessage );
