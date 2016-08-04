// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import Footer from 'components/ui/footer';
import Header from 'components/ui/header';
import styles from './styles.scss';

const DefaultLayoutWithHeader = ( { children } ) => {
	return (
		<div>
			<Header/>
			<div className={ styles.content }>
				{ children }
			</div>

			<Footer />
		</div>
	);
};

DefaultLayoutWithHeader.propTypes = {
	children: PropTypes.node.isRequired
};

export default withStyles( styles )( DefaultLayoutWithHeader );
