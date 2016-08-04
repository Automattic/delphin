// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import Footer from 'components/ui/footer';
import Header from 'components/ui/header';
import styles from './styles.scss';

const Sunrise = ( { children, languagePickerClassName } ) => {
	return (
		<div>
			<div className={ styles.content }>
				<Header />
				{ children }
			</div>

			<Footer languagePickerClassName={ languagePickerClassName } />
		</div>
	);
};

Sunrise.propTypes = {
	children: PropTypes.node.isRequired,
	languagePickerClassName: PropTypes.string
};

export default withStyles( styles )( Sunrise );
