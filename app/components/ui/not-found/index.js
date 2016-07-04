// External dependencies
import i18n from 'i18n-calypso';
import React from 'react';
import withTitle from 'lib/title-decorator';

function NotFound() {
	return (
		<div>{ i18n.translate( '404 Not Found' ) }</div>
	);
}

export default withTitle( NotFound, i18n.translate( '404 Not Found' ) );
