// External dependencies
import debugFactory from 'debug';
import config from 'config';
import { default as getPath } from 'lodash/get';
import i18n from 'i18n-calypso';
import WPCOM from 'wpcom';

// Internal dependencies
import { getTokenFromBearerCookie } from 'client/bearer-cookie';
import { getUserConnect, getUserLocale } from 'reducers/user/selectors';
import {
	WPCOM_REQUEST
} from 'reducers/action-types';

// Module variables
const debug = debugFactory( 'delphin:wpcom-middleware' );

const SUPPORTED_API_METHODS = [ 'get', 'post', 'put', 'delete' ];

const UNAUTHENTICATED_NAMESPACES = [ 'geo/' ];

/**
 * Given a WPCOM parameter set, modifies the query such that a non-default
 * locale is added to the query parameter.
 *
 * @param  {String} locale the requested locale
 * @param  {Object} query Original query parameters
 * @param  {String} apiNamespace The namespace of the request
 * @return {Object}        Revised parameters, if non-default locale
 */
function addLocaleQueryParam( locale, query, apiNamespace ) {
	let localeParam;

	if ( apiNamespace === 'wpcom/v2' ) {
		// Meta properties like locale are prefixed with an underscore in the
		// v2 API
		localeParam = { _locale: locale };
	} else {
		localeParam = { locale };
	}

	return Object.assign( {}, query, localeParam );
}

/**
 * Performs a wpcom request using the state for bearer token and locale
 * @param {Object} state application redux state
 * @param {Object} action the WPCOM_REQUEST action
 * @returns {Promise} promise from WPCOM
 */
function makeWpcomRequest( state, action ) {
	let token;
	let locale;

	// get token from state if user is verified
	// user is logged in only when fetch user is complete
	// but we get bearer token before that, on verify user
	if ( getPath( getUserConnect( state ), 'data.bearerToken' ) ) {
		token = getUserConnect( state ).data.bearerToken;
	}

	// get from state if user logged in
	if ( getPath( state, 'user.isLoggedIn' ) ) {
		locale = getUserLocale( state );
	}

	// If there's no language for the user, get if from the URL
	if ( ! locale ) {
		locale = i18n.getLocaleSlug();
	}

	// If there's no token for the user get it from the cookie
	if ( ! token ) {
		token = getTokenFromBearerCookie();
	}

	let { method, params, query, payload } = action;

	// Endpoints are authenticated by default, with the exception of UNAUTHENTICATED_NAMESPACES
	const api = WPCOM( UNAUTHENTICATED_NAMESPACES.indexOf( params.apiNamespace ) === -1 ? token : undefined );

	// not supplied method or unsupported, revert to GET
	if ( SUPPORTED_API_METHODS.indexOf( method ) === -1 ) {
		method = 'get';
	}

	if ( typeof params === 'string' ) {
		params = {
			path: params
		};
	}

	const wordpressConfig = config( 'wordpress' );
	if ( wordpressConfig && method !== 'get' ) {
		payload = Object.assign( {}, payload, {
			client_id: wordpressConfig.rest_api_oauth_client_id,
			client_secret: wordpressConfig.rest_api_oauth_client_secret
		} );
	}

	query = addLocaleQueryParam( locale, query || {}, params.apiNamespace );

	const reqArgs = [ params, query ];

	if ( payload ) {
		reqArgs.push( payload );
	}

	debug( 'requesting', reqArgs );
	return api.req[ method ].apply( api.req, reqArgs )
			.then( ( data ) => ( { data: data, requestArguments: reqArgs, requestToken: token } ) );
}

/**
 * Helper to get an action creator for action field, if supplied actionCreator
 * is already a function, nothing is done, it's simply returned, if it's a string,
 * action creator function is created.
 * @param {Function|String} actionCreator function, action string, or action object.
 * @param {String} type actionCreator's type: success|fail
 * @returns {Function} action creator
 */
function getActionCreator( actionCreator, type ) {
	// A function action creator can override the dispatch behavior
	if ( typeof actionCreator === 'function' ) {
		return actionCreator;
	}

	// Default action creator will be a thunk
	return param => dispatch => {
		if ( typeof actionCreator === 'string' ) {
			dispatch( { type: actionCreator } );
		}

		if ( typeof actionCreator === 'object' ) {
			dispatch( actionCreator );
		}

		if ( type === 'fail' ) {
			return Promise.reject( param );
		}

		return param;
	};
}

/**
 * Middleware that handles WPCOM_REQUEST
 * @param {Object} store redux store
 * @returns {Function} middleware function
 */
const wpcomMiddleware = store => next => action => {
	if ( action.type === WPCOM_REQUEST ) {
		// dispatch loading action:
		store.dispatch( getActionCreator( action.loading )() );

		// The return of the promise here makes sure the chain of dispatch is kept
		// so the result of dispatch( ... ) will return the result of store.dispatch
		// on request success / failure.
		return makeWpcomRequest( store.getState(), action ).then( ( result ) => {
			debug( 'request success', action );
			// The result from here will be returned to the original dispatch:
			return store.dispatch( getActionCreator( action.success, 'success' )( result.data, result.requestArguments, result.requestToken ) );
		} ).catch( ( error ) => {
			debug( 'request failed', action, error );
			// The result from here will be returned to the original dispatch:
			return store.dispatch( getActionCreator( action.fail, 'fail' )( error ) );
		} );
	}

	return next( action );
};

export default wpcomMiddleware;
