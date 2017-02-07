// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import ProgressBar from 'components/ui/progress-bar';
import styles from './styles.scss';

const ProgressHeader = ( { children, handleOnExitClick, progress } ) => {
	return <div className={ styles.headerContainer }>
		<div className={ styles.header }>
			<h1 className={ styles.headerText }>
				<span className={ styles.setUpLabel }>
					{ i18n.translate( 'Setup: ' ) }
				</span>
				{ children }
			</h1>
			<div>
				<ProgressBar progress={ progress } />
				<span onClick={ handleOnExitClick } className={ styles.exit }>Exit</span>
			</div>
		</div>
	</div>;
};

ProgressHeader.propTypes = {
	children: PropTypes.string,
	handleOnExitClick: PropTypes.func.isRequired,
	progress: PropTypes.number.isRequired,
};

export default withStyles( styles )( ProgressHeader );
