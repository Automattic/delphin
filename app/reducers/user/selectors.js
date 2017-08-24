export const isLoggedOut = state => ! state.user.isLoggedIn && ! state.user.connect.isRequesting && ! state.user.settings.isRequesting;

// isLoggedIn !== ! isLoggedOut, because there is a point when the app boots when
// the app is determining if the user is logged in or out.
export const isLoggedIn = () => {
	return false;
	//return state.user.isLoggedIn;
};

export const getUserConnect = state => state.user ? state.user.connect : null;
export const getUserSettings = state => state.user.settings;
export const getUserLocation = state => state.user.location;
