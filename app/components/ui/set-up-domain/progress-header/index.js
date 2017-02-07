// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import { getPath } from 'routes';
import ProgressBar from 'components/ui/progress-bar';
import styles from './styles.scss';

const ProgressHeader = ( { children, progress } ) => {
	return (
		<div className={ styles.headerContainer }>
			<div className={ styles.header }>
				<h1 className={ styles.headerText }>
					<span className={ styles.setUpLabel }>
						{ i18n.translate( 'Setup: ' ) }
					</span>
					{ children }
				</h1>
				<div className={ styles.progressHeader }>
					<div className={ styles.fullWidth }>
						<ProgressBar progress={ progress } />
					</div>
					<a className={ styles.exit } href={ getPath( 'myDomains' ) }>Exit</a>
				</div>
			</div>
		</div>
	);
};

ProgressHeader.propTypes = {
	children: PropTypes.string,
	progress: PropTypes.number.isRequired,
};

export default withStyles( styles )( ProgressHeader );
