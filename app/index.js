// External dependencies
import React from 'react';
import { Router } from 'react-router';

// Internal dependencies
import { routes } from 'routes';

export default function App( { history } ) {
	return (
		<Router history={ history } routes={ routes } />
	);
}
