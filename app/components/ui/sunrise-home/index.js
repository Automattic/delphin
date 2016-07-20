// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import ApplicationProcess from 'components/ui/application-process';
import Button from 'components/ui/button';
import DocumentTitle from 'components/ui/document-title';
import DomainInput from 'components/ui/domain-input';
import ExperimentWarning from 'components/ui/experiment-warning';
import styles from './styles.scss';

const SunriseHome = React.createClass( {
	propTypes: {
		fields: PropTypes.object.isRequired,
		handleSubmit: PropTypes.func.isRequired,
		redirectToConfirmDomain: PropTypes.func.isRequired
	},

	handleSubmit() {
		this.props.redirectToConfirmDomain();
	},

	render() {
		const { fields: { query }, handleSubmit } = this.props;

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

				<ApplicationProcess />
			</div>
		);
	}
} );

export default withStyles( styles )( SunriseHome );
