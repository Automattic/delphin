/**
 * External dependencies
 */
import React, { Component } from 'react';

/**
 * Internal dependencies
 */
import { imageUrl } from './';

function getDisplayName( WrappedComponent ) {
	return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export default function withAssets( WrappedComponent ) {
	return class WithAssets extends Component {
		static displayName = `WithAssets(${ getDisplayName( WrappedComponent ) })`;

		render() {
			return <WrappedComponent imageUrl={ imageUrl } { ...this.props } />;
		}
	};
}
