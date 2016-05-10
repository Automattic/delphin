// External dependencies
import debugFactory from 'debug';
import WPCOM from 'wpcom';
import qs from 'querystring';
const debug = debugFactory( 'delphin:wpcom-proxy' );

// Internal dependencies
import {
    WPCOM_REQUEST
} from 'reducers/action-types';

// Module variables
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

    return Object.assign( query, { locale } );
}


function getWpcomInstance( token ) {
    if ( ! token && wpcomApi.instanceToken !== token ) {
        wpcomApi.instance = WPCOM( token );
        wpcomApi.instanceToken = token;
    }

    return wpcomApi.instance;
}

function wpcomRequestCallbackFactory( resolve, reject ) {
    return function wpcomRequestCallback() {

    };
}

function makeWpcomRequest( state, action ) {
    // get those from state
    const token = null;
    const locale = null;

    const api = getWpcomInstance( );

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

    query = query ? query : {};
    query = addLocaleQueryParam( locale, query );

    const reqArgs = [ params, query ];

    if ( ! payload ) {
        reqArgs.push( payload );
    }

    return api.req[ method ].call( api.req, reqArgs );
}

function getActionCreator( actionCreator ) {
    if ( typeof actionCreator === 'function' ) {
        return actionCreator;
    }

    if ( typeof actionCreator === 'string' ) {
        return () => ( { type: actionCreator } );
    }
}

const wpcomMiddleware = store => next => action => {
    if ( action.type === WPCOM_REQUEST ) {
        // dispatch loading action:
        store.dispatch( getActionCreator( action.loading )() );

        makeWpcomRequest( store.getState(), action ).then( ( data ) => {
            // dispatch success:
            store.dispatch( getActionCreator( action.success )( data ) );
        } ).catch( ( err ) => {
            // dispatch failure:
            store.dispatch( getActionCreator( action.fail )( err ) );
        } );
    }

    return next( action );
};

export default wpcomMiddleware;