// External dependencies
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import omit from 'lodash/omit';

const TrackingLink = props => {
	const { onClick } = props;
	const newProps = omit( props, [ 'eventName', 'eventParams', 'trackEvent' ] );

	newProps.onClick = ( ...args ) => {
		// track event, it's already bound with eventName on the container
		props.trackEvent();

		if ( typeof onClick === 'function' ) {
			return onClick( ...args );
		}
	};

	return (
		<Link { ...newProps }>
			{ props.children }
		</Link>
	);
};

TrackingLink.propTypes = {
	children: PropTypes.node,
	onClick: PropTypes.func,
	trackEvent: PropTypes.func.isRequired
};

export default TrackingLink;

