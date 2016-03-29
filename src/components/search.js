
import React from 'react';
import WPCOM from 'wpcom';

const wpcomAPI = WPCOM( process.env.WPCOM_API_KEY );
console.log( process.env.WPCOM_API_KEY );

export default function Search() {
	return (
		<div>Search</div>
	);
}
