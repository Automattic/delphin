// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import NoticeContainer from 'components/containers/notice';
import styles from './styles.scss';

const Notices = function( { notices } ) {
	return (
		<div className={ styles.notices }>
			{ notices.map( ( notice ) => (
				<NoticeContainer
					notice={ notice }
					key={ notice.id }
				/>
			) ) }
		</div>
	);
};

Notices.propTypes = {
	notices: PropTypes.array.isRequired
};

export default withStyles( styles )( Notices );
