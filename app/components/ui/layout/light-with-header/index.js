// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import Header from 'components/ui/header';
import FixedBackground from 'components/ui/fixed-background';
import styles from './styles.scss';

const LightLayoutWithHeader = ( { children } ) => {
	return (
		<div className={ styles.layout }>
			<FixedBackground light />

			<Header />

			<div className={ styles.content }>
				{ children }
			</div>
		</div>
	);
};

LightLayoutWithHeader.propTypes = {
	children: PropTypes.node.isRequired
};

export default withStyles( styles )( LightLayoutWithHeader );
