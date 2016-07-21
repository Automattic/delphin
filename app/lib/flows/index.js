// Internal dependencies
import config from 'config';

const flows = config( 'flows' );

export const getFlowLength = flowName => (
	flows[ flowName ].length
);

export const getPageSlugFromFlow = ( flowName, step ) => (
	flows[ flowName ][ step ]
);

export const isPartOfFlow = ( pageSlug, flowName ) => (
	-1 !== flows[ flowName ].indexOf( pageSlug )
);
