// External dependencies
import React, { PropTypes } from 'react';
import { Router } from 'react-router';

// Internal dependencies
import DocumentTitle from 'components/ui/document-title';
import { routes } from 'routes';

const App = function( { history } ) {
	return (
		<DocumentTitle>
			<Router history={ history } routes={ routes } />
		</DocumentTitle>
	);
};

App.propTypes = {
	history: PropTypes.object.isRequired
};

export default App;
