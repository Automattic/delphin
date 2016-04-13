import React from 'react';
import i18n from 'lib/i18n';

export default function Hello() {
	return (
		<div>{ i18n.translate( 'Hello !' ) }</div>
	);
}
