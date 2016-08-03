// External dependencies
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import pick from 'lodash/pick';

const LINK_PROPS = [
	'to',
	'query',
	'hash',
	'state',
	'activeStyle',
	'activeClassName',
	'onlyActiveOnIndex',
	'onClick',
	'target'
];

const TrackingLink = props => {
	const { onClick } = props;
	const newProps = pick( props, LINK_PROPS );

	newProps.onClick = ( ...args ) => {
		// track event, it's already bound with eventName on the container
		props.trackEvent();

		if ( typeof onClick === 'function' ) {
			return onClick( ...args );
		}
	};

	return (
		<Link { ...newProps } />
	);
};

TrackingLink.propTypes = {
	onClick: PropTypes.func,
	trackEvent: PropTypes.func.isRequired
};

export default TrackingLink;

