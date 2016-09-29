// External dependencies
import React, { PropTypes } from 'react';

// Internal dependencies
import wordpress from './wordpress';
import other from 'components/containers/set-up-connect-other';

const providers = {
	wordpress,
	other
};

const SetUpConnect = ( { domainName, provider } ) => {
	const Component = providers[ provider ] || React.div;

	return <Component { ...{ domainName } } />;
};

SetUpConnect.propTypes = {
	domainName: PropTypes.string.isRequired,
	provider: PropTypes.string.isRequired
};

export default SetUpConnect;
