// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import DocumentTitle from 'components/ui/document-title';
import DomainInput from 'components/ui/domain-input';
import ExperimentWarning from 'components/ui/experiment-warning';
import styles from './styles.scss';

const SunriseHome = React.createClass( {
	propTypes: {
		fields: PropTypes.object.isRequired,
		handleSubmit: PropTypes.func.isRequired
	},

	handleSubmit() {
		// TODO: Go to the "confirm application" step
		return;
	},

	render() {
		const { fields: { query }, handleSubmit } = this.props;

		return (
			<div>
				<form onSubmit={ handleSubmit( this.handleSubmit ) }>
					<DocumentTitle />

					<ExperimentWarning />

					<h2 className={ styles.heading }>
						{ i18n.translate( 'Apply for your {{em}}.blog{{/em}} domain!', {
							components: { em: <em className="emphasis" /> }
						} ) }
					</h2>

					<div className={ styles.secondaryHeadingContainer }>
						<h3 className={ styles.secondaryHeading }>
							{ i18n.translate(
								'The .blog launch is currently in the Sunrise phase for trademark holders. ' +
								"Don't have a trademark? No problem! Your domain will be added to a pre-registration list."
							) }
						</h3>
					</div>

					<DomainInput
						{ ...query }
						autoComplete="off"
						autoFocus
						className={ styles.field }
						placeholder={ i18n.translate( 'Enter your domain name' ) }
						ref="query" />

					<button
						className={ styles.button }>
						{ i18n.translate( 'Next' ) }
					</button>
				</form>

				<div className={ styles.trademark }>
					{ i18n.translate( 'Registering a trademark domain? {{a}}Start here{{/a}}', {
						components: {
							a: <a href="#" className={ styles.explanationLink }></a>
						}
					} ) }
				</div>

				<div className={ styles.explanationsWrapper }>
					<h2 className={ styles.explanationsHeading }>{ i18n.translate( 'How does the application process work?' ) }</h2>
					<div className={ styles.explanationsHeadingLine } />

					<div className={ styles.explanations }>
						<div className={ styles.explanationBlock }>
							<div className={ styles.explanationTitle }>
								{ i18n.translate( 'Trademark Check' ) }
							</div>
							<div>
								<p className={ styles.explanationText }>{ i18n.translate( "If you're applying for a domain containing a trademark you own, you will be able to claim it by identifying as the mark's owner. We use a service called TMCH to handle trademark claims." ) }</p>
								<p><a href="#" className={ styles.explanationLink }>{ i18n.translate( 'Learn more about registering trademarked domains' ) }</a></p>
							</div>
						</div>

						<div className={ styles.explanationBlock }>
							<div className={ styles.explanationTitle }>
								{ i18n.translate( 'Identification and Payment' ) }
							</div>
							<div>
								<p className={ styles.explanationText }>{ i18n.translate( "Contact information and a valid payment method are required when applying for a domain. Your application fee will be refunded if you don't get your domain." ) }</p>
								<p><a href="#" className={ styles.explanationLink }>{ i18n.translate( 'Learn more about our pricing and billing' ) }</a></p>
							</div>
						</div>

						<div className={ styles.explanationBlock }>
							<div className={ styles.explanationTitle }>
								{ i18n.translate( 'Granting Applications' ) }
							</div>
							<div>
								<p className={ styles.explanationText }>{ i18n.translate( "To offer everyone a fair chance, we'll accept applications in two stages, and multiple requests for the same domain will be handled by auction. We'll keep you posted on the status of your application." ) }</p>
								<p><a href="#" className={ styles.explanationLink }>{ i18n.translate( 'Learn more about the launch schedule' ) }</a></p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
} );

export default withStyles( styles )( SunriseHome );
