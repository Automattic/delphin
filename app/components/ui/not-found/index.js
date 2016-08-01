// External dependencies
import i18n from 'i18n-calypso';
import React from 'react';

// Internal dependencies
import withPageView from 'lib/analytics/with-page-view';

const NotFound = () => (
	<div>{ i18n.translate( '404 Not Found' ) }</div>
);

export default withPageView( NotFound, '404' );
