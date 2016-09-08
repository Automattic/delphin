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
		fields: PropTypes.object.isRequired,
		handleSubmit: PropTypes.func.isRequired,
		redirectToSearch: PropTypes.func.isRequired,
		selectDomain: PropTypes.func.isRequired,
		submitFailed: PropTypes.bool.isRequired,
		values: PropTypes.object.isRequired
	},

	handleSubmit() {
		const query = this.props.values.q;

		this.props.redirectToSearch( query );
	},

	render() {
		const { handleSubmit } = this.props,
			queryField = this.props.fields.q,
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
				<form
					className={ styles.form }
					onSubmit={ handleSubmit( this.handleSubmit ) }
					method="get"
					action={ getPath( 'search' ) }
				>
					<DocumentTitle />

					<div className={ styles.whatsYourStory } />

					<h2 className={ styles.heading }>
						{ preventWidows( pageHeading, 2 ) }
					</h2>

					<div className={ styles.domainSearch }>
						<div className={ styles.field }>
							<SunriseDomainInput
								field={ queryField }
								ref="q"
							/>

							<ValidationError field={ queryField } submitFailed={ this.props.submitFailed } />
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
