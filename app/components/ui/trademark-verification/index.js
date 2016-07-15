// External dependencies
import i18n from 'i18n-calypso';
import { Link } from 'react-router';
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import Button from 'components/ui/button';
import Form from 'components/ui/form';
import styles from './styles.scss';
import SunriseStep from 'components/ui/sunrise-step';

const TrademarkVerification = () => (
	<SunriseStep>
		<SunriseStep.Header>
			<h1>{ i18n.translate( 'Attach your trademark verification' ) }</h1>
			<h2>
				{ i18n.translate( 'Upload or paste the contents of your valid SMD file to ' +
				'verify your rights to register this domain.' ) }
			</h2>
		</SunriseStep.Header>

		<SunriseStep.Form
			className={ styles.form }
			onSubmit={ null }
		>
			<div>
				<textarea className={ styles.textarea } />

				<Button className={ styles.button }>{ i18n.translate( 'Continue with application' ) }</Button>
				<p>
					{ i18n.translate( "Don't own the trademark for foobar.blog?" ) }
				</p>
				<p>
					<Link to="/">{ i18n.translate( 'Try a different domain' ) }</Link>
				</p>
			</div>
		</SunriseStep.Form>

		<SunriseStep.Footer>
			{ i18n.translate( 'An SMD file (Signed Mark Data) acts as proof of ' +
				'your right to pre-register domains that match your trademark.' ) }
			{ ' ' }
			{ i18n.translate( 'Get your SMD file by signing up with the {{a}}Trademark Clearinghouse{{/a}}, ' +
				'an organization assigned to validate trademarks for use in domains.', {
					components: { a: <a href="http://www.trademark-clearinghouse.com/" /> }
				}
			) }
		</SunriseStep.Footer>
	</SunriseStep>
);

export default withStyles( styles )( TrademarkVerification );
