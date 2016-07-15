// External dependencies
import i18n from 'i18n-calypso';
import { Link } from 'react-router';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import Button from 'components/ui/button';
import DocumentTitle from 'components/ui/document-title';
import { getPath } from 'routes';
import styles from './styles.scss';

const SunriseConfirmDomain = ( { domain } ) => (
	<div>
		<DocumentTitle />

		<div className={ styles.header }>
			<h1>
				{ i18n.translate( 'We found it!' ) }
			</h1>
			<h2>
				{ i18n.translate( 'That looks like a nice domain. Apply for ' +
						'this domain to secure it for your blog.' ) }
			</h2>
		</div>

		<form className={ styles.form }>
			<h3 className={ styles.text }>
				{ domain }
			</h3>
			<hr className={ styles.rule } />
			<div className={ styles.priceTag }>
				{ i18n.translate( '$220 application fee' ) }
			</div>
			<div className={ styles.renewalInfo }>
				{ i18n.translate( 'Renews at $30 per year' ) }
			</div>
			<Button className={ styles.button }>
				{ i18n.translate( 'Apply for this domain' ) }
			</Button>
			<div className={ styles.backNotice }>
				<div>
					{ i18n.translate( 'Not the domain you want?' ) }
				</div>
				<Link to={ getPath( 'home' ) }>
					{ i18n.translate( 'Try a different domain' ) }
				</Link>
			</div>
		</form>

		<div className={ styles.extraInfoBottom }>
			{ i18n.translate( 'We may receive other applications for the domain you want. ' +
					'If so, we\'ll notify all applicants and put the domain up for auction. ' +
					'Applications are open until November 9.' ) }
		</div>
	</div>
);

SunriseConfirmDomain.propTypes = {
	domain: PropTypes.string.isRequired
};

export default withStyles( styles )( SunriseConfirmDomain );
