// External dependencies
import DocumentTitle from 'react-document-title';
import React from 'react';

const DEFAULT_TITLE = 'MagicDomains';

const DocumentTitleWrapper = ( Component, titleFn ) => props => {
	const title = typeof titleFn === 'function' ? titleFn( props ) : titleFn;
	const formattedTitle = title ? `${ title } | ${ DEFAULT_TITLE }` : DEFAULT_TITLE;

	return <DocumentTitle title={ formattedTitle }>
			<Component {...props} />
		</DocumentTitle>;
};

export default DocumentTitleWrapper;
