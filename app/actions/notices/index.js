// Internal dependencies
import {
	NOTICE_ADD,
	NOTICE_REMOVE
} from 'reducers/action-types';

export function addNotice( { message, status } ) {
	if ( typeof message === 'object' ) {
		const messageArray = Object.keys( message ).map( noticeKey => {
			return message[ noticeKey ];
		} );
		message = messageArray.join( ', ' );
	}

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
