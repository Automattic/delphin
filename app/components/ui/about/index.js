// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';

const About = React.createClass( {
	propTypes: {
		updatePageTitle: PropTypes.func.isRequired
	},

	componentWillMount() {
		this.props.updatePageTitle( i18n.translate( 'About' ) );
	},

	render() {
		return (
			<div>{ i18n.translate( 'About' ) }</div>
		);
	}
} );

export default About;
