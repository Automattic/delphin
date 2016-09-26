// External dependencies
import debugFactory from 'debug';
import config from 'config';
import { default as getPath } from 'lodash/get';
import i18n from 'i18n-calypso';
import handler from 'wpcom-xhr-request';

// Internal dependencies
import { getTokenFromBearerCookie } from 'client/bearer-cookie';
import { getUserConnect } from 'reducers/user/selectors';
import {
	WPCOM_REQUEST
} from 'reducers/action-types';
import { camelizeKeys } from 'lib/formatters';

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
 * Adds arbitrary properties to the local storage `delphin:checkout` value to
 * checkout endpoint requests.
 *
 * @param {string} path - Endpoint path
 * @param {object} query - Query parameter object
 * @return {object} New query parameter object with additional properties
 */
function addLocalStorageCheckoutPropertiesToQuery( path, query ) {
	const checkoutPaths = [ '/me/paygate-configuration', '/delphin/purchases', '/delphin/transactions' ];
	const checkoutPropertiesString = localStorage.getItem( 'delphin:checkout' );
	if ( checkoutPaths.indexOf( path ) === -1 || ! checkoutPropertiesString ) {
		return query;
	}

	const checkoutProperties = checkoutPropertiesString.split( ':' );

	return Object.assign( {}, query, {
		[ checkoutProperties[ 0 ] ]: checkoutProperties[ 1 ]
	} );
}

/**
 * Performs a wpcom request using the state for bearer token and locale
 * @param {Object} state application redux state
 * @param {Object} action the WPCOM_REQUEST action
 * @returns {Promise} promise for request
 */
function makeWpcomRequest( state, action ) {
	let token;

	// get token from state if user is verified
	// user is logged in only when fetch user is complete
	// but we get bearer token before that, on verify user
	if ( getPath( getUserConnect( state ), 'data.bearerToken' ) ) {
		token = getUserConnect( state ).data.bearerToken;
	}

	// If there's no token for the user get it from the cookie
	if ( ! token ) {
		token = getTokenFromBearerCookie();
	}

	let { method, params, query, payload } = action;

	// Endpoints are authenticated by default, with the exception of UNAUTHENTICATED_NAMESPACES
	if ( UNAUTHENTICATED_NAMESPACES.indexOf( params.apiNamespace ) !== -1 ) {
		token = null;
	}

	const locale = i18n.getLocaleSlug();

	// not supplied method or unsupported, revert to GET
	if ( SUPPORTED_API_METHODS.indexOf( method ) === -1 ) {
		method = 'get';
	}

	if ( typeof params === 'string' ) {
		params = {
			path: params
		};
	}

	query = addLocalStorageCheckoutPropertiesToQuery( params.path, query );

	const wordpressConfig = config( 'wordpress' );
	if ( wordpressConfig && method !== 'get' ) {
		payload = Object.assign( {}, payload, {
			client_id: wordpressConfig.rest_api_oauth_client_id,
			client_secret: wordpressConfig.rest_api_oauth_client_secret
		} );
	}

	query = addLocaleQueryParam( locale, query || {}, params.apiNamespace );

	params = Object.assign( {}, params, {
		query,
		authToken: token,
		body: payload,
		method,
	} );

	debug( 'requesting', params );

	return new Promise( ( resolve, reject ) => {
		handler( params, ( error, body ) => {
			if ( error ) {
				reject( error );
			} else {
				resolve( {
					data: camelizeKeys( body ),
					requestParams: params,
					requestToken: token,
				} );
			}
		} );
	} );
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
			debug( 'request success', action, result );
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
