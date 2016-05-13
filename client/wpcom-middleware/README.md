# wpcom-middleware
This middleware provides WPCOM integration with redux,
instead of calling it directly, we'll dispatch an action with request's parameters.

That will allow us replace implementation more easily if it ever becomes necessary
and allow fetch the token/locale from the store in a single place for attaching it to the
request.

```javascript
export function createUser( form ) {
	return dispatch => {
		const payload = {
			username: form.username,
			email: form.email,
			password: form.password,
			validate: false
		};

		request.post( '/users/new' ).send( payload ).end( ( error, results ) => {
			const data = JSON.parse( results.text );

			if ( error ) {
				return dispatch( addNotice( {
					message: data.message,
					status: 'error'
				} ) );
			}

			// Reinitialize WPCOM so that future requests with be authed
			wpcomAPI = WPCOM( data.bearer_token );

			// Save the bearer token for future requests
			bearerToken = data.bearer_token;

			dispatch( createUserComplete( form, data.bearer_token ) );
		} );
	};
}
```

Translates to this:
```javascript
export function createUser( form ) {
	return {
		type: WPCOM_REQUEST,
		method: 'post',
		params: { path: '/users/new' },
		payload: {
			username: form.username,
			email: form.email,
			password: form.password,
			validate: false
		},
		success: ( data ) => createUserComplete( form, data.bearer_token ),
		fail: ( err ) => addNotice( {
			message: err.message,
			status: 'error'
		} )
	};
}
```