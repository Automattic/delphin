// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import DocumentTitle from 'components/ui/document-title';
import styles from './styles.scss';
import SunriseStep from 'components/ui/sunrise-step';

const Success = ( { domain, email } ) => (
	<SunriseStep className={ styles.step }>
		<DocumentTitle title={ i18n.translate( 'Success' ) } />

		<SunriseStep.Header className={ styles.header }>
			<h1>
				{ i18n.translate( "That's a happy blog!" ) }
			</h1>

			<h2>
				{ i18n.translate( 'Your application for {{strong}}%(domain)s{{/strong}} is being processed.',
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
					{ i18n.translate( "What happens now?" ) }
				</h3>

				<p>
					{ i18n.translate( "Your application will be reviewed by November 9. We'll email you at {{strong}}%(email)s{{/strong}} with more details.",
						{
							args: { email },
							components: { strong: <strong /> }
						}
					) }
				</p>
			</div>

			<div className={ styles.text }>
				<p>
					{ i18n.translate( "If no other requests are received for this domain, you will be granted the domain shortly after November 9." ) }
				</p>

				<p>
					{ i18n.translate( "If multiple requests are received for this domain, you will be able to bid for it in an auction, between November 14 and November 17." ) }
				</p>

				<p>
					{ i18n.translate( "Please set up an account with our auction partner, NameJet, so you will be ready in case your domain goes to auction." ) }
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

Success.propTypes = {
	domain: PropTypes.string.isRequired,
	email: PropTypes.string.isRequired
};

export default withStyles( styles )( Success );
