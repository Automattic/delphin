// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import Header from 'components/ui/header';
import styles from './styles.scss';

const LayoutNoMargin = ( { children } ) => {
	return (
		<div>
			<Header/>
			<div className={ styles.content }>
				{ children }
			</div>
		</div>
	);
};

LayoutNoMargin.propTypes = {
	children: PropTypes.node.isRequired
};

export default withStyles( styles )( LayoutNoMargin );
