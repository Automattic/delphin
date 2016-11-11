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
import ProgressBar from 'components/ui/progress-bar';
import Radio from 'components/ui/form/radio';
import styles from './styles.scss';

class SelectBlogType extends Component {
	handleSubmit( values ) {
		const { redirect, domainName } = this.props;

		if ( values.newOrExisting === 'new' ) {
			redirect( 'selectNewBlogNeeds', { pathParams: { domainName } } );
		}

		if ( values.newOrExisting === 'existing' ) {
			redirect( 'findExistingBlog', { pathParams: { domainName } } );
		}
	}

	isSubmitButtonDisabled() {
		const { invalid, pristine, submitting } = this.props;

		return invalid || pristine || submitting;
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

				<div className={ styles.header }>
					<h1 className={ styles.headerText }>
						<span className={ styles.setUpLabel }>
							{ i18n.translate( 'Setup: ' ) }
						</span>
						{ i18n.translate( 'Tell us about your blog' ) }
					</h1>
					<ProgressBar progress={ 10 } />
				</div>

				<Form onSubmit={ handleSubmit( this.handleSubmit ) }>
					<Form.FieldArea>
						<p>
							{ i18n.translate( 'What do you want to do with %(domainName)s?', {
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
							{ i18n.translate( 'Use it for a blog I already started' ) }
						</label>

						<label className={ styles.label } htmlFor="new">
							<Radio
								className={ styles.radio }
								{ ...newOrExisting }
								id="new"
								value="new"
								checked={ newOrExisting.value === 'new' }
							/>
							{ i18n.translate( 'Start building a new blog now' ) }
						</label>
					</Form.FieldArea>

					<Form.SubmitArea>
						<Button disabled={ this.isSubmitButtonDisabled() }>
							{ i18n.translate( 'Next' ) }
						</Button>
					</Form.SubmitArea>

					<Form.Footer>
						<p className={ styles.formFooter }>{ i18n.translate( 'Looking to edit your nameservers yourself?' ) }</p>
						<p>
							{ i18n.translate( "There is copy here about {{Link}}editing nameservers{{/Link}}. I'm not sure what to say here Ran.", {
								components: { Link: <Link to={ getPath( 'updateNameservers', { domainName } ) } /> }
							} ) }
						</p>
					</Form.Footer>
				</Form>

				<div className={ styles.footer }>
					<Link to={ getPath( 'myDomains' ) }>
						{ i18n.translate( 'I\'ll set up my domain later' ) }
					</Link>
				</div>
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
	redirect: PropTypes.func.isRequired,
	submitting: PropTypes.bool.isRequired,
};

export default withStyles( styles )( bindHandlers( SelectBlogType ) );
