// External dependencies
import BodyClassName from 'react-body-classname';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import HeaderContainer from 'components/containers/header';
import styles from './styles.scss';

const DefaultLayout = ( { children, style, location } ) => {
	return (
		<div>
			<BodyClassName className={ style } />

			<div className={ styles.content }>
				<HeaderContainer location={ location } />

				{ children }
			</div>
		</div>
	);
};

DefaultLayout.propTypes = {
	children: PropTypes.node.isRequired,
	location: PropTypes.object.isRequired,
	style: PropTypes.string.isRequired,
};

const DefaultLayoutFactory = style => withStyles( styles )( props => DefaultLayout( { ...props, style } ) );

export const DefaultDarkLayout = DefaultLayoutFactory( styles.dark );
export const DefaultLightLayout = DefaultLayoutFactory( styles.light );
