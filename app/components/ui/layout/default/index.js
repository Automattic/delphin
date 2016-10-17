// External dependencies
import BodyClassName from 'react-body-classname';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import Header from 'components/ui/header';
import styles from './styles.scss';

const DefaultLayout = ( { children, style } ) => {
	return (
		<div>
			<BodyClassName className={ style } />

			<div className={ styles.content }>
				<Header />

				{ children }
			</div>
		</div>
	);
};

DefaultLayout.propTypes = {
	children: PropTypes.node.isRequired,
	style: PropTypes.string.isRequired
};

const DefaultLayoutFactory = style => withStyles( styles )( props => DefaultLayout( { ...props, style } ) );

export const DefaultDarkLayout = DefaultLayoutFactory( styles.dark );
export const DefaultLightLayout = DefaultLayoutFactory( styles.light );
