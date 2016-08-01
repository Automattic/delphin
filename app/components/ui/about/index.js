// External dependencies
import i18n from 'i18n-calypso';
import React from 'react';

// Internal dependencies
import DocumentTitle from 'components/ui/document-title';
import withPageView from 'lib/analytics/with-page-view';

const About = () => {
	return (
		<DocumentTitle title={ 'About' }>
			<div>{ i18n.translate( 'About' ) }</div>
		</DocumentTitle>
	);
};

export default withPageView( About, 'About' );
