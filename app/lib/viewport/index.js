/**
 * Determine whether a user is viewing Delphin from a device within a
 * particular mobile-first responsive breakpoint
 *
 * @returns {boolean} Whether the viewport is mobile breakpoint size
 */
export const isMobile = () => (
	global.window ? Math.min( global.window.innerWidth, global.window.innerHeight ) <= 480 : false
);
