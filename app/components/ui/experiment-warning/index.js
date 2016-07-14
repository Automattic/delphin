// External dependencies
import i18n from 'i18n-calypso';
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

const ExperimentWarning = () => (
	<div className={ styles.warning }>
		<div className={ styles.warningHeading }>
			{ i18n.translate( 'Warning: This is an experiment, it may bite.' ) }
		</div>
		<div className={ styles.warningText }>
			{ i18n.translate( 'This site not ready for public consumption, it will probably break and give you a nasty hangover.' ) }
		</div>
	</div>
);

export default withStyles( styles )( ExperimentWarning );
