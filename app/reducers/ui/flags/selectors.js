// External dependencies
import get from 'lodash/get';

export const getFlag = ( state, name ) => get( state, `ui.flags.${ name }.value`, false );
