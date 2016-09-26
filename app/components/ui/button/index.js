// External dependencies
import classNames from 'classnames';
import { Link } from 'react-router';
import omit from 'lodash/omit';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import { isExternalUrl } from 'lib/routes';
import styles from './styles.scss';

const Button = ( { children, className, ...props } ) => {
	let element;
	let newProps;
	if ( props.href ) {
		const isExternal = isExternalUrl( props.href );

		element = isExternal ? 'a' : Link;
		newProps = isExternal ? props : { to: props.href, ...omit( props, 'href' ) };
	} else {
		element = 'button';
		newProps = props;
	}

	return React.createElement(
		element,
		{
			className: classNames( styles.button, className ),
			...newProps
		},
		children
	);
};

Button.propTypes = {
	children: React.PropTypes.oneOfType( [
		React.PropTypes.arrayOf( React.PropTypes.node ),
		React.PropTypes.node
	] ).isRequired,
	className: PropTypes.string,
	href: PropTypes.string,
};

export default withStyles( styles )( Button );
