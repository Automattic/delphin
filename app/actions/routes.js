// External dependencies
import { push } from 'react-router-redux';

// Internal dependencies
import { getPath } from 'app/routes';
import {
	SET_CURRENT_ROUTES
} from 'reducers/action-types';

/***
 * Creates a redirect push action
 * @param {string} pathSlug a path slug as appears in route definitions
 * @param {{queryParams: string, pathParams:string}} options object that has queryParams - key value pairs of query
 * parameters and pathParams a route parameters as defined in routes definitions
 * @returns {Object} push redirect action
 */
export const redirect = ( pathSlug, options = {} ) => {
	const { queryParams, pathParams } = options;

	const locationDescriptor = {
		pathname: getPath( pathSlug, pathParams )
	};

	if ( queryParams ) {
		locationDescriptor.query = queryParams;
	}

	return push( locationDescriptor );
};

export const setCurrentRoutes = ( routes ) => {
	return {
		type: SET_CURRENT_ROUTES,
		routes
	};
};

