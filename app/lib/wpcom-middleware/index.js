// External dependencies
import debugFactory from 'debug';
import config from '../../config';
import { default as getPath } from 'lodash/get';
import noop from 'lodash/noop';
import WPCOM from 'wpcom';

// Internal dependencies
import {
	WPCOM_REQUEST
} from 'reducers/action-types';

// Module variables
const debug = debugFactory( 'delphin:wpcom-middleware' );
let wpcomApi = {
	instance: WPCOM(),
	instanceToken: null
};

const SUPPORTED_API_METHODS = [ 'get', 'post', 'put', 'delete' ];

/**
 * Given a WPCOM parameter set, modifies the query such that a non-default
 * locale is added to the query parameter.
 *
 * @param  {String} locale the requested locale
 * @param  {Object} query Original query parameters
 * @return {Object}        Revised parameters, if non-default locale
 */
function addLocaleQueryParam( locale, query ) {
	if ( ! locale || 'en' === locale ) {
		return query;
	}

	return Object.assign( {}, query, { locale } );
}

/**
 * Gets an instance of WPCOM according to supplied token,
 * if the instance wasn't previously instantiated with that token a new instance is created
 * @param token bearer token for WPCOM
 * @returns {WPCOM} wpcom instance
 */
function getWpcomInstance( token ) {
	if ( ! token && wpcomApi.instanceToken !== token ) {
		debug( 'switching wpcom instance for token ' + token );
		wpcomApi.instance = WPCOM( token );
		wpcomApi.instanceToken = token;
	}

	return wpcomApi.instance;
}

/**
 * Performs a wpcom request using the state for bearer token and locale
 * @param state application redux state
 * @param action the WPCOM_REQUEST action
 * @returns {Promise} promise from WPCOM
 */
function makeWpcomRequest( state, action ) {
	let token;
	let locale;

	// get token and locale from state if user logged in
	if ( getPath( state, 'user.isLoggedIn' ) ) {
		token = getPath( state, 'user.data.bearerToken' );
		locale = getPath( state, 'user.data.locale' );
	}

	const api = getWpcomInstance( token );

	let { method, params, query, payload } = action;

	// not supplied method or unsupported, revert to GET
	if ( SUPPORTED_API_METHODS.indexOf( method ) === -1 ) {
		method = SUPPORTED_API_METHODS[0];
	}

	if ( typeof params === 'string' ) {
		params = {
			path: params
		};
	}

	const wordpressConfig = config( 'wordpress' );
	if ( wordpressConfig && method != 'get' ) {
		payload = Object.assign( {}, payload, {
			client_id: wordpressConfig.rest_api_oauth_client_id,
			client_secret: wordpressConfig.rest_api_oauth_client_secret
		} );
	}
	query = query ? addLocaleQueryParam( locale, query ) : {};

	const reqArgs = [ params, query ];

	if ( payload ) {
		reqArgs.push( payload );
	}

	debug( 'requesting', reqArgs );
	return api.req[ method ].apply( api.req, reqArgs );
}

/**
 * Helper to get an action creator for action field, if supplied actionCreator
 * is already a function, nothing is done, it's simply returned, if it's a string,
 * action creator function is created.
 * @param {Function|String} actionCreator actionCreator function or an action string
 * @returns {Function} action creator
 */
function getActionCreator( actionCreator ) {
	if ( typeof actionCreator === 'function' ) {
		return actionCreator;
	}

	if ( typeof actionCreator === 'string' ) {
		return () =>( { type: actionCreator } );
	}

	return noop;
}

/**
 * Middleware that handles WPCOM_REQUEST
 * @param {Object} store redux store
 */
const wpcomMiddleware = store => next => action => {

	if ( action.type === WPCOM_REQUEST ) {
		// dispatch loading action:
		store.dispatch( getActionCreator( action.loading )() );

		// the return of the promise used here mainly for testing
		return makeWpcomRequest( store.getState(), action ).then( ( data ) => {
			debug( 'request success', action );
			// dispatch success:
			return store.dispatch( getActionCreator( action.success )( data ) );
		} ).catch( ( err ) => {
			debug( 'request failed', action, err );
			// dispatch failure:
			return store.dispatch( getActionCreator( action.fail )( err ) );
		} );
	}

	return next( action );
};

export default wpcomMiddleware;