// External dependencies
import pick from '';

// Internal dependencies
import config from 'config';

const flows = config( 'flows' );

export const getFlowLength = flowName => (
	flows[ flowName ].length
);

export const getPageSlugFromFlow = ( flowName, step ) => (
	flows[ flowName ][ step ]
);

export const getStepFromSlug = ( flowName, pageSlug ) => (
	flows[ flowName ].indexOf( pageSlug )
);

export const isPartOfFlow = ( flowName, pageSlug ) => (
	-1 !== flows[ flowName ].indexOf( pageSlug )
);
