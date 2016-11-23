// External dependencies
import i18n from 'i18n-calypso';
import { Link } from 'react-router';
import React, { PropTypes } from 'react';

// Internal dependencies
import { getPath } from 'routes';

const CustomNameServersLink = ( { domainName } ) => (
	<p>
		{ i18n.translate( 'Have your own name servers? {{Link}}Configure manually{{/Link}}.', {
			components: { Link: <Link to={ getPath( 'updateNameservers', { domainName } ) } /> }
		} ) }
	</p>
);

CustomNameServersLink.propTypes = {
	domainName: PropTypes.string.isRequired,
};

export default CustomNameServersLink;
