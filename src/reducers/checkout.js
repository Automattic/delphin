export function checkout( state = {}, action ) {
	const { name, type } = action;
	switch ( type ) {
		case 'SELECT_DOMAIN':
			return { name };
		default:
			return state;
	}
}