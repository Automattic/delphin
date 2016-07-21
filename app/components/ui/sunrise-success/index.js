// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import DocumentTitle from 'components/ui/document-title';
import styles from './styles.scss';
import SunriseStep from 'components/ui/sunrise-step';

const SunriseSuccess = ( { domain, email } ) => (
	<SunriseStep className={ styles.step }>
		<DocumentTitle title={ i18n.translate( 'Success' ) } />

		<SunriseStep.Header className={ styles.header }>
			<h1>
				{ i18n.translate( "That's a happy blog!" ) }
			</h1>

			<h2>
				{ i18n.translate( 'Your application for {{strong}}%(domain)s{{/strong}} has been submitted.',
					{
						args: { domain },
						components: { strong: <strong /> }
					}
				) }
			</h2>
		</SunriseStep.Header>

		<div className={ styles.content }>
			<div className={ styles.highlight }>
				<h3>
					{ i18n.translate( "Make sure you're ready for the next step!" ) }
				</h3>

				<p>
					{ i18n.translate( "We'll let you know if you need to prepare for a bidding war." ) }
				</p>
			</div>

			<div className={ styles.text }>
				<p>
					{ i18n.translate( "If no other requests are received for this domain, it's yours! But if we receive multiple requests you will be able to bid for it at auction." ) }
				</p>

				<p>
					{ i18n.translate( "We suggest setting up an account at {{a}}NameJet{{/a}}, our domain auction partner, just in case your domain goes to auction. We'll email you at {{strong}}%(email)s{{/strong}} with more details.",
						{
							args: {
								email
							},
							components: {
								a: <a href="http://www.namejet.com/" target="_blank" />,
								strong: <strong />
							}
						}
					) }
				</p>

				<a
					className={ styles.button }
					href="https://www.namejet.com/Pages/Login.aspx"
					target="_blank">
					{ i18n.translate( 'Sign up at NameJet' ) }
				</a>
			</div>
		</div>
	</SunriseStep>
);

SunriseSuccess.propTypes = {
	domain: PropTypes.string.isRequired,
	email: PropTypes.string.isRequired
};

export default withStyles( styles )( SunriseSuccess );
