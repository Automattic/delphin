// Internal dependencies
import { sectionIsFetching, sectionWasFetched } from 'actions/ui/is-section-loading';

// Module variables
let store;

/**
 * Provides the global store to `sections`. This is optional and allows
 * sections to toggle a loading state when a section is loading.
 *
 * @param {object} storeGlobal - Reference to the global store
 *
 */
export const provideStore = storeGlobal => {
	store = storeGlobal;
};

export const sections = {
	myDomains: () => System.import( './my-domains' ),
	hosts: () => System.import( './hosts' ),
	setUp: () => System.import( './set-up' ),
	checkout: () => System.import( './checkout' ),
};

export const getComponent = ( section, routeSlug ) => ( location, callback ) => {
	const dispatch = store && store.dispatch ? store.dispatch : () => {};

	dispatch( sectionIsFetching( section ) );

	sections[ section ]().then( module => {
		dispatch( sectionWasFetched( section ) );

		callback( null, module.default[ routeSlug ] );
	} );
};
