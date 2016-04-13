/**
 * External dependencies
 */
import i18n from 'lib/i18n';
import React from 'react';

export default function Hello() {
	return (
		<div>{ i18n.translate( 'Hello !' ) }</div>
	);
}
