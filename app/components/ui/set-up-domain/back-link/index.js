// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';

// Internal dependencies
import TrackingLink from 'components/containers/tracking-link';

const BackLink = ( { stepName, ...props } ) => (
	<TrackingLink
		eventName="delphin_setup_back_click"
		eventParams={ { step_name: stepName } }
		{ ...props }
	>{ i18n.translate( 'Back' ) }</TrackingLink>
);

BackLink.propTypes = {
	stepName: PropTypes.string.isRequired,
};

export default BackLink;
