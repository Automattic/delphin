// External dependencies
import get from 'lodash/get';

export const getToggle = ( state, name ) => get( state, `ui.toggle.${ name }.value`, false );
