export function checkout( state = {}, action ) {
	const { domain, type } = action;
	switch ( type ) {
		case 'SELECT_DOMAIN':
			return { domain };
		default:
			return state;
	}
}