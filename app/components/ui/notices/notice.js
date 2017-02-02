// External dependencies
import classNames from 'classnames';
import Gridicon from 'gridicons';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

const Notice = function( { notice, removeNotice } ) {
	return (
		<div className={ classNames( styles.notice, styles[ notice.status ] ) }>
			<Gridicon
				className={ styles.noticeIcon }
				icon="notice-outline"
				size={ 32 }
			/>

			{ notice.message }

			<span className={ styles.remove } onClick={ removeNotice }>
				<Gridicon
					className={ styles.gridicon }
					icon="cross"
				/>
			</span>
		</div>
	);
};

Notice.propTypes = {
	notice: PropTypes.object.isRequired,
	removeNotice: PropTypes.func.isRequired
};

export default withStyles( styles )( Notice );
