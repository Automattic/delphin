// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import Footer from 'components/ui/footer';
import Header from 'components/ui/header';
import FixedBackground from 'components/ui/fixed-background';
import styles from './styles.scss';

const LayoutNoMargin = ( { children } ) => {
	return (
		<div className={ styles.layout }>
			<FixedBackground dark/>
			<div className={ styles.content }>
				<Header/>
				{ children }
			</div>

			<Footer hasBorder isDark />
		</div>
	);
};

LayoutNoMargin.propTypes = {
	children: PropTypes.node.isRequired
};

export default withStyles( styles )( LayoutNoMargin );
