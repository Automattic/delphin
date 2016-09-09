// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import Button from 'components/ui/button';
import DocumentTitle from 'components/ui/document-title';
import { preventWidows } from 'lib/formatters';
import SunriseDomainInput from 'components/ui/sunrise-domain-input';
import { getPath } from 'routes';
import styles from './styles.scss';
import ValidationError from 'components/ui/form/validation-error';
import withPageView from 'lib/analytics/with-page-view';

const SunriseHome = React.createClass( {
	propTypes: {
		asyncValidate: PropTypes.func.isRequired,
		fields: PropTypes.object.isRequired,
		handleSubmit: PropTypes.func.isRequired,
		redirectToConfirmDomain: PropTypes.func.isRequired,
		selectDomain: PropTypes.func.isRequired,
		submitFailed: PropTypes.bool.isRequired,
		touch: PropTypes.func.isRequired,
		values: PropTypes.object.isRequired
	},

	componentDidMount() {
		const { fields: { query } } = this.props;

		// Trigger validation if we have an initialValue for query
		if ( query.initialValue ) {
			this.props.touch( query.name );
			this.props.handleSubmit( () => null )();
		}
	},

	handleSubmit() {
		const { query } = this.props.values;

		this.props.redirectToConfirmDomain( query );
	},

	render() {
		const { fields: { query }, handleSubmit } = this.props,
			confirmDomainPath = getPath( 'confirmDomain' ),
			pageHeading = i18n.translate( 'Every .blog is a story. Tell yours.', {
				components: { em: <em className="emphasis" /> }
			} ),
			pageContent = i18n.translate(
				'Millions of short, easy to remember domains will be available when the .blog domain goes live November 21. '
			) + i18n.translate(
				'Apply now to secure the perfect domain for your blog.'
			);

		return (
			<div className={ styles.homeContainer }>
				<form className={ styles.form }
						onSubmit={ handleSubmit( this.handleSubmit ) }
						method="get" action={ confirmDomainPath } >
					<DocumentTitle />

					<div className={ styles.whatsYourStory } />

					<h2 className={ styles.heading }>
						{ preventWidows( pageHeading, 2 ) }
					</h2>

					<div className={ styles.domainSearch }>
						<div className={ styles.field }>
							<SunriseDomainInput
								{ ...query }
								autoComplete="off"
								autoCapitalize="off"
								autoFocus
								placeholder={ i18n.translate( 'Enter your domain name' ) }
								field={ this.props.fields.query }
								ref="query" />

							<ValidationError field={ this.props.fields.query } submitFailed={ this.props.submitFailed } />
						</div>

						<Button className={ styles.button }>
							{ i18n.translate( 'Get started' ) }
						</Button>
					</div>

					<div className={ styles.secondaryHeadingContainer }>
						<h3 className={ styles.secondaryHeading }>
							{ preventWidows( pageContent, 3 ) }
						</h3>
					</div>
				</form>
			</div>
		);
	}
} );

export default withStyles( styles )( withPageView( SunriseHome, 'Home' ) );
