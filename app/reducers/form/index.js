// External dependencies
import { reducer } from 'redux-form';

// Internal dependencies
import { LOGOUT_USER } from 'reducers/action-types';

export default reducer.plugin( {
	contactInformation: ( state, { type } ) => ( type === LOGOUT_USER ) ? {} : state,
} );
