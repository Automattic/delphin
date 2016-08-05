// External dependencies
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import omit from 'lodash/omit';
import startsWith from 'lodash/startsWith';

const TrackingLink = props => {
	const { onClick } = props;
	const newProps = omit( props, [ 'eventName', 'eventParams', 'trackEvent' ] );
	const isExternalLink = startsWith( props.to, 'https://' ) ||
		startsWith( props.to, 'http://' ) ||
		startsWith( props.to, 'mailto:' );

	newProps.onClick = ( ...args ) => {
		// track event, it's already bound with eventName on the container
		props.trackEvent();

		if ( typeof onClick === 'function' ) {
			return onClick( ...args );
		}
	};

	if ( isExternalLink ) {
		const href = newProps.to;

		if ( ! startsWith( href, 'mailto:' ) ) {
			newProps.target = '_blank';
		}

		return (
			<a href={ href } { ...omit( newProps, 'to' ) }>
				{ props.children }
			</a>
		);
	}

	return (
		<Link { ...newProps }>
			{ props.children }
		</Link>
	);
};

TrackingLink.propTypes = {
	children: PropTypes.node,
	onClick: PropTypes.func,
	to: PropTypes.string,
	trackEvent: PropTypes.func.isRequired
};

export default TrackingLink;

