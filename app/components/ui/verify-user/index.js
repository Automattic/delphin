// External dependencies
import React from 'react';

// Internal dependencies
import i18n from 'lib/i18n';

const VerifyUser = ( { fields } ) => {
	return (
		<div>
			<div>
				<label>{ i18n.translate( 'Confirmation code:' ) }</label>
				<input { ...fields.code } />
			</div>
			<div>
				<button>{ i18n.translate( 'Verify my email' ) }</button>
			</div>
		</div>
	);
};

export default VerifyUser;
