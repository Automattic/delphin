// Internal dependencies
import {
	NOTICE_ADD,
	NOTICE_REMOVE
} from 'reducers/action-types';

export function addNotice( { message, status } ) {
	return {
		notice: { message, status },
		type: NOTICE_ADD
	};
}

export function removeNotice( notice ) {
	return {
		notice,
		type: NOTICE_REMOVE
	};
}
