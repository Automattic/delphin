// Internal dependencies
import {
	LANGUAGE_PICKER_SELECT_HIDE,
	LANGUAGE_PICKER_SELECT_SHOW
} from 'reducers/action-types';

export const hideSelect = () => ( { type: LANGUAGE_PICKER_SELECT_HIDE } );
export const showSelect = () => ( { type: LANGUAGE_PICKER_SELECT_SHOW } );
