// External dependencies
import React from 'react';

// Internal dependencies
import i18n from 'lib/i18n';

const CreateUser = ( { fields, handleSubmit } ) => {
	return (
		<form onSubmit={ handleSubmit }>
			<div>
				<label>{ i18n.translate( 'Email address:' ) }</label>
				<input { ...fields.email } />
			</div>
			<div>
				<button>{ i18n.translate( 'Next' ) }</button>
			</div>
		</form>
	);
};

export default CreateUser;
