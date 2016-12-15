// External dependencies
import { push, replace } from 'react-router-redux';

// Internal dependencies
import { getPath } from 'app/routes';

/***
 * Creates a redirect push action
 * @param {string} pathSlug a path slug as appears in route definitions
 * @param {{queryParams: string, pathParams:string, state: string}} options object that has queryParams - key value pairs of query
 * parameters and pathParams a route parameters as defined in routes definitions
 * @returns {Object} push redirect action
 */
export const redirect = ( pathSlug, options = {} ) => {
	const { queryParams, pathParams, noHistory, state } = options;

	const locationDescriptor = {
		pathname: getPath( pathSlug, pathParams )
	};

	if ( queryParams ) {
		locationDescriptor.query = queryParams;
	}

	if ( state ) {
		locationDescriptor.state = state;
	}

	if ( noHistory ) {
		return replace( locationDescriptor );
	}

	return push( locationDescriptor );
};
