// External dependencies
import i18n from 'i18n-calypso';
import React from 'react';

// Internal dependencies
import DocumentTitle from 'components/ui/document-title';

export default function About() {
	return (
		<DocumentTitle title={ 'About' }>
			<div>{ i18n.translate( 'About' ) }</div>
		</DocumentTitle>
	);
}
