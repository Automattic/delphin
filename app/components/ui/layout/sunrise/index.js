// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import FixedBackground from 'components/ui/fixed-background';
import Footer from 'components/ui/footer';
import Header from 'components/ui/header';
import styles from '../no-margin/styles.scss';

const Sunrise = ( { children } ) => {
	return (
		<div>
			<FixedBackground light/>

			<div className={ styles.content }>
				<Header />
				{ children }
			</div>

			<Footer />
		</div>
	);
};

Sunrise.propTypes = {
	children: PropTypes.node.isRequired,
};

export default withStyles( styles )( Sunrise );
