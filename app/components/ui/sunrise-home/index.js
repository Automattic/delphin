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
			<DocumentTitle>
				<form onSubmit={ handleSubmit( this.handleSubmit ) }>
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
			</DocumentTitle>
		);
	}
} );

export default withStyles( styles )( SunriseHome );
