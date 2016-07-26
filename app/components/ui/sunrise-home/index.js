// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import Button from 'components/ui/button';
import DocumentTitle from 'components/ui/document-title';
import DomainInput from 'components/ui/domain-input';
import styles from './styles.scss';
import ValidationError from 'components/ui/form/validation-error';
import { withTld } from 'lib/domains';

const SunriseHome = React.createClass( {
	propTypes: {
		fields: PropTypes.object.isRequired,
		handleSubmit: PropTypes.func.isRequired,
		redirectToConfirmDomain: PropTypes.func.isRequired,
		selectDomain: PropTypes.func.isRequired,
		submitFailed: PropTypes.bool.isRequired,
		values: PropTypes.object.isRequired
	},

	handleSubmit() {
		this.props.selectDomain( { domain_name: withTld( this.props.values.query ), cost: '€666' } );

		this.props.redirectToConfirmDomain();
	},

	render() {
		const { fields: { query }, handleSubmit } = this.props;

		const explanations = [
			{
				title: i18n.translate( 'Trademark Check' ),
				text: i18n.translate( "Claim domains that contain a trademark by identifying as the mark's owner." ),
				linkText: i18n.translate( 'Learn more about registering trademarked domains' )
			},
			{
				title: i18n.translate( 'Identification and Payment' ),
				text: i18n.translate( "Your application fee will be refunded if you don't get your domain." ),
				linkText: i18n.translate( 'Learn more about our pricing and billing' )
			},
			{
				title: i18n.translate( 'Granting Applications' ),
				text: i18n.translate( "Some applications may need to be settled in an auction at a later date. We'll keep you posted." ),
				linkText: i18n.translate( 'Learn more about the launch schedule' )
			}
		];

		return (
			<div>
				<form className={ styles.form } onSubmit={ handleSubmit( this.handleSubmit ) }>
					<DocumentTitle />

					<h2 className={ styles.heading }>
						{ i18n.translate( 'Every .blog is a story. Tell yours.', {
							components: { em: <em className="emphasis" /> }
						} ) }
					</h2>

					<div className={ styles.secondaryHeadingContainer }>
						<h3 className={ styles.secondaryHeading }>
							{ i18n.translate(
								'Millions of short, easy to remember domains will be available when the .blog domain goes live November 21. '
							) }
							<br /><br />
							{ i18n.translate(
								'Apply now to secure the perfect domain for your blog.'
							) }
						</h3>
					</div>

					<div className={ styles.domainSearch }>
						<div className={ styles.field }>
							<DomainInput
								{ ...query }
								autoComplete="off"
								autoFocus
								placeholder={ i18n.translate( 'Enter your domain name' ) }
								ref="query" />

							<ValidationError field={ this.props.fields.query } submitFailed={ this.props.submitFailed } />
						</div>

						<Button className={ styles.button }>
							{ i18n.translate( 'Next' ) }
						</Button>
					</div>
				</form>

				<div className={ styles.explanationsWrapper }>
					<h2 className={ styles.explanationsHeading }>{ i18n.translate( 'How does the application process work?' ) }</h2>
					<div className={ styles.explanationsHeadingLine } />

					<div className={ styles.explanations }>
						{ explanations.map( ( explanation, index ) => (
							<div className={ styles.explanationBlock } key={ index }>
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
