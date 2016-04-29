// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import i18n from 'lib/i18n';
import styles from './styles.scss';

const Notice = function( { notice, removeNotice } ) {
	return (
		<div className={ styles.notice }>
			{ notice.message }
			<span className={ styles.remove } onClick={ removeNotice }>
				{ i18n.translate( 'Hide' ) }
			</span>
		</div>
	);
};

Notice.propTypes = {
	notice: PropTypes.object.isRequired,
	removeNotice: PropTypes.func.isRequired,
};

export default withStyles( styles )( Notice );
