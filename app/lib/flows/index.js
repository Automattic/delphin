// Internal dependencies
import config from 'config';

const flows = config( 'flows' );

export const getPageSlugFromFlow = ( currentFlow, currentStep ) => {
	return flows[ currentFlow ][ currentStep ];
};

export const isPartOfFlow = ( pageSlug, currentFlow ) => {
	return -1 !== flows[ currentFlow ].indexOf( pageSlug );
};

