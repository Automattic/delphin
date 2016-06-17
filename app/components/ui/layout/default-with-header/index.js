// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import Header from 'components/ui/layout/mixins/header';
import styles from './styles.scss';

const DefaultLayoutWithHeader = ( { children } ) => {
	return (
		<div>
			<Header/>
			<div className={ styles.content }>
				{ children }
			</div>
		</div>
	);
};

DefaultLayoutWithHeader.propTypes = {
	children: PropTypes.node.isRequired
};

export default withStyles( styles )( DefaultLayoutWithHeader );
