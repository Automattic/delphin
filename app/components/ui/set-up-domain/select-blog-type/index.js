// External dependencies
import { bindHandlers } from 'react-bind-handlers';
import i18n from 'i18n-calypso';
import { Link } from 'react-router';
import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import Button from 'components/ui/button';
import DocumentTitle from 'components/ui/document-title';
import { getPath } from 'routes';
import Form from 'components/ui/form';
import ProgressHeader from 'components/containers/set-up-domain/progress-header';
import Radio from 'components/ui/form/radio';
import styles from './styles.scss';
import withPageView from 'lib/analytics/with-page-view';

class SelectBlogType extends Component {
	handleSubmit( values ) {
		const { newOrExisting } = values;

		if ( values.newOrExisting === 'new' ) {
			this.trackAndRedirect( 'selectNewBlogNeeds', newOrExisting );
		}

		if ( newOrExisting === 'existing' ) {
			this.trackAndRedirect( 'findExistingBlog', newOrExisting );
		}
	}

	isSubmitButtonDisabled() {
		const { invalid, pristine, submitting } = this.props;

		return invalid || pristine || submitting;
	}

	trackAndRedirect( pathSlug, newOrExisting ) {
		const { domainName, recordTracksEvent, redirect } = this.props;

		recordTracksEvent( 'delphin_setup_new_existing_submit', { setup_type: newOrExisting } );

		redirect( pathSlug, { pathParams: { domainName } } );
	}

	render() {
		const {
			domainName,
			handleSubmit,
			fields: { newOrExisting },
		} = this.props;

		return (
			<div className={ styles.domainSetup }>
				<DocumentTitle title={ i18n.translate( 'Set up domain' ) } />

				<ProgressHeader
					content={ i18n.translate( 'Tell us about your blog.' ) }
					progress={ 10 }
				/>

				<Form onSubmit={ handleSubmit( this.handleSubmit ) }>
					<Form.FieldArea>
						<p className={ styles.actionLabel }>
							{ i18n.translate( 'What do you want on %(domainName)s?', {
								args: { domainName }
							} ) }
						</p>

						<label className={ styles.label } htmlFor="existing">
							<Radio
								className={ styles.radio }
								{ ...newOrExisting }
								id="existing"
								value="existing"
								checked={ newOrExisting.value === 'existing' }
							/>
							{ i18n.translate( 'An existing blog I already started.' ) }
						</label>

						<label className={ styles.label } htmlFor="new">
							<Radio
								className={ styles.radio }
								{ ...newOrExisting }
								id="new"
								value="new"
								checked={ newOrExisting.value === 'new' }
							/>
							{ i18n.translate( 'A new blog I\'ll start now.' ) }
						</label>
					</Form.FieldArea>

					<Form.SubmitArea>
						<Button disabled={ this.isSubmitButtonDisabled() }>
							{ i18n.translate( 'Next' ) }
						</Button>
					</Form.SubmitArea>

					<Form.Footer>
						<p>
							{ i18n.translate( 'Have your own name servers? {{Link}}Configure manually{{/Link}}.', {
								components: { Link: <Link to={ getPath( 'updateNameservers', { domainName } ) } /> }
							} ) }
						</p>
					</Form.Footer>
				</Form>
			</div>
		);
	}
}

SelectBlogType.propTypes = {
	domainName: PropTypes.string.isRequired,
	fields: PropTypes.object.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	invalid: PropTypes.bool.isRequired,
	pristine: PropTypes.bool.isRequired,
	recordTracksEvent: PropTypes.func.isRequired,
	redirect: PropTypes.func.isRequired,
	submitting: PropTypes.bool.isRequired,
};

export default withStyles( styles )( withPageView( bindHandlers( SelectBlogType ), 'Select Blog Type' ) );
