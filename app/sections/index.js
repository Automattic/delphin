// Internal dependencies
import { hideToggle, showToggle } from 'actions/ui/toggle';

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

export const getComponent = ( sectionSlug, routeSlug ) => ( location, callback ) => {
	const dispatch = store && store.dispatch ? store.dispatch : () => {};

	dispatch( showToggle( 'isSectionLoading' ) );

	sections[ sectionSlug ]().then( module => {
		dispatch( hideToggle( 'isSectionLoading' ) );

		callback( null, module.default[ routeSlug ].default );
	} );
};
