// Internal dependencies
import {
	CONTACT_INFORMATION_ADDRESS2_INPUT_SHOW,
	CONTACT_INFORMATION_INPUT_VISIBILITY_RESET,
	CONTACT_INFORMATION_ORGANIZATION_INPUT_SHOW
} from 'reducers/action-types';

export const showAddress2Input = () => ( { type: CONTACT_INFORMATION_ADDRESS2_INPUT_SHOW } );
export const showOrganizationInput = () => ( { type: CONTACT_INFORMATION_ORGANIZATION_INPUT_SHOW } );
export const resetInputVisibility = () => ( { type: CONTACT_INFORMATION_INPUT_VISIBILITY_RESET } );
