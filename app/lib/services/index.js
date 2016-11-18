// External dependencies


const SUPPORTED_SERVICES = [ 'wpcom', 'pressable' ];

/**
 * @param {string} service - A service
 *
 * @return {bool} Whether the given service can be automatically connected.
 */
export const canConnectToService = service => SUPPORTED_SERVICES.indexOf( service ) > -1;

/**
 * @param {string} service - A service
 *
 * @return {string} A name for the given service (e.g. 'WordPress.com' if 'wpcom' is given).
 */
export const getServiceName = service => ( {
	wpcom: 'WordPress.com',
	pressable: 'Pressable',
}[ service ] );

/**
 * @param {string} service - A service
 *
 * @return {bool} True when service is auto connected.
 */
export const isAutoConnected = service => [ 'pressable', 'wpcom' ].includes( service );

/**
 * @param {string} service - A service
 *
 * @return {bool} True when service is connected with nameservers.
 */
export const isConnectedWithNameservers = service => service === 'custom';

/**
 * @param {string} service - A service
 *
 * @return {bool} True when service is managed by concierge.
 */
export const isManagedByConcierge = service => service === 'concierge';
