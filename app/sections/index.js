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
	setUpDomain: () => System.import( './set-up-domain' ),
	checkout: () => System.import( './checkout' ),
	updateContactInformation: () => System.import( './update-contact-information' ),
};

export const getComponent = ( section, routeSlug ) => ( location, callback ) => {
	const dispatch = store && store.dispatch ? store.dispatch : () => {};

	dispatch( sectionIsFetching( section ) );

	sections[ section ]().then( module => {
		dispatch( sectionWasFetched( section ) );

		callback( null, module.default[ routeSlug ] );
	} )
	.catch( callback );
};
