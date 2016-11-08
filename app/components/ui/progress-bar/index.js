// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

const ProgressBar = ( { progress } ) => {
	const inlineStyles = { width: progress + '%' };

	return (
		<div className={ styles.progressWrapper }>
			<div className={ styles.progress } style={ inlineStyles } ></div>
		</div>
	);
};

ProgressBar.propTypes = {
	progress: PropTypes.number.isRequired,
};

export default withStyles( styles )( ProgressBar );
