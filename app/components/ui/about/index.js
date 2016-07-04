// External dependencies
import i18n from 'i18n-calypso';
import React from 'react';

// Internal dependencies
import withTitle from 'lib/title-decorator';

function About() {
	return (
		<div>{ i18n.translate( 'About' ) }</div>
	);
}

export default withTitle( About, i18n.translate( 'About' ) );
