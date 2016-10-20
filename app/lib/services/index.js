const SUPPORTED_SERVICES = [ 'wpcom', 'pressable' ];

/**
 * @param {string} service - A service
 *
 * @return {bool} Whether the given service can be automatically connected.
 */
export const canConnectToService = service => SUPPORTED_SERVICES.indexOf( service ) > -1;
