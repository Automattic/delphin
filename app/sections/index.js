export const sections = {
	myDomains: () => System.import( './my-domains' ),
	hosts: () => System.import( './hosts' ),
	setUp: () => System.import( './set-up' ),
};

export const getComponent = ( sectionSlug, routeSlug ) => ( location, callback ) => {
	sections[ sectionSlug ]().then( module => callback( null, module.default[ routeSlug ].default ) );
};
