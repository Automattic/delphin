export function checkout( state = {}, action ) {
	const { domain, type } = action;
	switch ( type ) {
		case 'SELECT_DOMAIN':
			return { domain };
		case 'CREATE_USER_COMPLETE':
			return Object.assign( {}, state, {
				username: action.username,
				email: action.email,
				password: action.password,
				bearerToken: action.bearerToken
			} );
		case 'CREATE_SITE_COMPLETE':
			return Object.assign( {}, state, {
				site: action.slug,
				blogId: action.blogId
			} );
		default:
			return state;
	}
}