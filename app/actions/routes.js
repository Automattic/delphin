// External dependencies
import { push } from 'react-router-redux';

// Internal dependencies
import { getPath } from 'app/routes';

export const redirect = ( pathSlug, query ) => push( {
	pathname: getPath( pathSlug ),
	query,
} );
