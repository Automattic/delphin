// External dependencies
import i18n from 'i18n-calypso';
import { Link } from 'react-router';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import Form from 'components/ui/form';
import { getPath } from 'routes';
import styles from './styles.scss';

const CustomNameServersLink = ( { domainName } ) => (
	<Form.Footer>
		<p>
			{ i18n.translate( 'Have your own name servers? {{Link}}Configure manually{{/Link}}.', {
				components: { Link: <Link to={ getPath( 'updateNameservers', { domainName } ) } /> }
			} ) }
		</p>
	</Form.Footer>
);

CustomNameServersLink.propTypes = {
	domainName: PropTypes.string.isRequired,
};

export default withStyles( styles )( CustomNameServersLink );
