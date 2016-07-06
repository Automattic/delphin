// External dependencies
import React, { PropTypes } from 'react';
import { Router } from 'react-router';

// Internal dependencies
import { routes } from 'routes';
import withTitle from 'lib/title-decorator';

const App = function( { history } ) {
	return (
		<Router history={ history } routes={ routes } />
	);
};

App.propTypes = {
	history: PropTypes.object.isRequired
};

export default withTitle( App );
