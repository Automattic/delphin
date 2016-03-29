
import React from 'react';
import { Link, browserHistory } from 'react-router'

export default function Hello() {
	return (
		<div>Hello !!
			<Link to="/about">About</Link>
		</div>
	);
}
