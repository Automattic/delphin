// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import Button from 'components/ui/button';
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

		const explanations = [
			{
				title: i18n.translate( 'Trademark Check' ),
				text: i18n.translate( "If you're applying for a domain containing a trademark you own, you will be able to claim it by identifying as the mark's owner. We use a service called TMCH to handle trademark claims." ),
				linkText: i18n.translate( 'Learn more about registering trademarked domains' )
			},
			{
				title: i18n.translate( 'Identification and Payment' ),
				text: i18n.translate( "Contact information and a valid payment method are required when applying for a domain. Your application fee will be refunded if you don't get your domain." ),
				linkText: i18n.translate( 'Learn more about our pricing and billing' )
			},
			{
				title: i18n.translate( 'Granting Applications' ),
				text: i18n.translate( "To offer everyone a fair chance, we'll accept applications in two stages, and multiple requests for the same domain will be handled by auction. We'll keep you posted on the status of your application." ),
				linkText: i18n.translate( 'Learn more about the launch schedule' )
			}
		];

		return (
			<div>
				<form className={ styles.form } onSubmit={ handleSubmit( this.handleSubmit ) }>
					<DocumentTitle />

					<ExperimentWarning />

					<h2 className={ styles.heading }>
						{ i18n.translate( 'Give your blog the name it deserves', {
							components: { em: <em className="emphasis" /> }
						} ) }
					</h2>

					<div className={ styles.secondaryHeadingContainer }>
						<h3 className={ styles.secondaryHeading }>
							{ i18n.translate(
								'Millions of short, easy to remember names will be available when the new .blog domain goes live November 21. ' +
								'Pre-register now to secure the perfect domain for your blog!'
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

					<Button className={ styles.button }>
						{ i18n.translate( 'Next' ) }
					</Button>
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
						{ explanations.map( explanation => (
							<div className={ styles.explanationBlock }>
								<div className={ styles.explanationTitle }>
									{ explanation.title }
								</div>
								<div>
									<p className={ styles.explanationText }>{ explanation.text }</p>
									<p><a href="#" className={ styles.explanationLink }>{ explanation.linkText }</a></p>
								</div>
							</div>
						) ) }
					</div>
				</div>
			</div>
		);
	}
} );

export default withStyles( styles )( SunriseHome );
