import WPCOM from 'wpcom';
const CLIENT_ID = 39911;
const CLIENT_SECRET = 'cOaYKdrkgXz8xY7aysv4fU6wL6sK5J8a6ojReEIAPwggsznj4Cb6mW0nffTxtYT8';

let wpcomAPI = WPCOM();

export function selectDomain( domain ) {
	return {
		type: 'SELECT_DOMAIN',
		domain
	};
}

export function createUser( username, email, password ) {
	return dispatch => {
		wpcomAPI.req.post( '/users/new', {
			username,
			email,
			password,
			validate: false,
			client_id: CLIENT_ID,
			client_secret: CLIENT_SECRET
		}, ( error, data ) => {
			dispatch( createUserComplete( username, email, password, data.bearer_token ) );

			wpcomAPI = WPCOM( data.bearer_token );
		} )
	};
}

export function createUserComplete( username, email, password, bearerToken ) {
	return {
		type: 'CREATE_USER_COMPLETE',
		username,
		email,
		password,
		bearerToken
	};
}

export function createSite( slug ) {
	return dispatch => {
		wpcomAPI.req.post( '/sites/new', {
			blog_name: slug,
			blog_title: slug,
			lang_id: 1,
			locale: 'en',
			validate: false,
			client_id: CLIENT_ID,
			client_secret: CLIENT_SECRET
		}, ( error, data ) => {
			dispatch( createSiteComplete( slug ) );
		} );
	};
}



export function createSiteComplete( slug ) {
	return {
		type: 'CREATE_SITE_COMPLETE',
		slug
	};
}

