```
export function connectUser( email, intention, callback ) {
        return {
                type: WPCOM_API_REQ,
                method: 'post',
                url: intention === 'signup' ? '/users/email/new' : '/users/email',
                payload: email,
                success: ( dispatch, data ) => dispatch( {
                                        email,
                                        twoFactorAuthenticationEnabled: data.two_factor_authentication_enabled,
                                        type: CONNECT_USER_COMPLETE
                                } ),
                failure: ( dispatch ) => dispatch( { type: CONNECT_USER_FAIL } )
        };
}
```