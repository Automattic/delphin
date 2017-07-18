// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import config from 'config';
import DocumentTitle from 'components/ui/document-title';
import { preventWidows } from 'lib/formatters';
import { getPath } from 'routes';
import styles from './styles.scss';
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
			pageHeading = i18n.translate( 'We\'re sunsetting get.blog.' );

		return (
			<div className={ styles.homeContainer }>
				<form
					className={ styles.form }
					onSubmit={ handleSubmit( this.handleSubmit ) }
					method="get"
					action={ getPath( 'search' ) }
				>
					<DocumentTitle title={ i18n.translate( 'Find a new .blog domain for your blog.' ) } />

					<h2 className={ styles.heading }>
						{ preventWidows( pageHeading, 2 ) }
					</h2>

					<h3 className={ styles.heading }>
						{ i18n.translate( 'Head on to {{link}}wordpress.com/domains{{/link}} to find a new .blog domain for your blog.', {
							components: { link: <a href={ config( 'new_search_url' ) } target="_blank" rel="noopener noreferrer" /> }
						} ) }
					</h3>
				</form>

				<div className={ styles.whatsYourStory } />
			</div>
		);
	}
} );

export default withStyles( styles )( withPageView( SunriseHome, 'Home' ) );
