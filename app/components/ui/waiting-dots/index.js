// External dependencies
import classNames from 'classnames';
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

const WaitingDots = ( { className } ) => (
	<div className={ classNames( styles.waitingDots, className ) }>
		<span className={ styles.text }>{ i18n.translate( 'Waiting…' ) }</span>
		<div className={ styles.dot1 }></div>
		<div className={ styles.dot2 }></div>
		<div className={ styles.dot3 }></div>
	</div>
);

WaitingDots.propTypes = {
	className: PropTypes.string,
};

export default withStyles( styles )( WaitingDots );
