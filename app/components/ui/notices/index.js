// External dependencies
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import Notice from './notice';
import styles from './styles.scss';

const Notices = function( { notices, clearNotice } ) {
	return (
		<div className={ styles.notices }>
			{ notices.map( ( notice ) => {
				return <Notice
					clearNotice={ clearNotice }
					notice={ notice }
					key={ notice.id } />;
			} ) }
		</div>
	);
};

export default withStyles( styles )( Notices );
