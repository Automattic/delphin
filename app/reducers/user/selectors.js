export const isLoggedOut = state => ! state.user.isLoggedIn && ! state.user.isRequesting;
