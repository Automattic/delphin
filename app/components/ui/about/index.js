// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';

const About = ( { updatePageTitle } ) => {
	updatePageTitle( i18n.translate( 'About' ) );

	return (
		<div>{ i18n.translate( 'About' ) }</div>
	);
};

About.propTypes = {
	updatePageTitle: PropTypes.func.isRequired
};

export default About;
