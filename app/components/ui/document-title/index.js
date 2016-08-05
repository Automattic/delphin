// External dependencies
import DocumentTitle from 'react-document-title';
import React, { PropTypes } from 'react';

const DEFAULT_TITLE = 'get.blog';

const DocumentTitleWrapper = ( { children, title } ) => {
	const formattedTitle = title ? `${ title } | ${ DEFAULT_TITLE }` : DEFAULT_TITLE;

	return <DocumentTitle title={ formattedTitle }>{ children }</DocumentTitle>;
};

DocumentTitleWrapper.propTypes = {
	children: PropTypes.oneOfType( [
		PropTypes.element,
		PropTypes.string
	] ),
	title: PropTypes.string
};

export default DocumentTitleWrapper;
