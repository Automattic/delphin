// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import Footer from 'components/ui/footer';
import Header from 'components/ui/header';
import styles from '../no-margin/styles.scss';

const Sunrise = ( { children, isFooterDark } ) => {
	return (
		<div>
			<div className={ styles.content }>
				<Header />
				{ children }
			</div>

			<Footer isDark={ isFooterDark } />
		</div>
	);
};

Sunrise.propTypes = {
	children: PropTypes.node.isRequired,
	isFooterDark: PropTypes.bool,
};

export default withStyles( styles )( Sunrise );
