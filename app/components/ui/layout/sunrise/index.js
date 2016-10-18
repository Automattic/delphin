// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import FixedBackground from 'components/ui/fixed-background';
import Header from 'components/ui/header';
import styles from '../default/styles.scss';

const SunriseLayout = ( { children } ) => {
	return (
		<div>
			<FixedBackground light />

			<div className={ styles.content }>
				<Header />
				{ children }
			</div>
		</div>
	);
};

SunriseLayout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default withStyles( styles )( SunriseLayout );
