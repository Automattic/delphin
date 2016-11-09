// External dependencies
import { bindHandlers } from 'react-bind-handlers';
import i18n from 'i18n-calypso';
import { Link } from 'react-router';
import noop from 'lodash/noop';
import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import Button from 'components/ui/button';
import DocumentTitle from 'components/ui/document-title';
import { getPath } from 'routes';
import Form from 'components/ui/form';
import { preventWidows } from 'lib/formatters';
import ProgressBar from 'components/ui/progress-bar';
import Radio from 'components/ui/form/radio';
import styles from './styles.scss';
import SunriseStep from 'components/ui/sunrise-step';

class SelectNewBlogHost extends Component {
	componentWillMount() {
		const { hasAnsweredPreviousQuestion, domainName, redirect } = this.props;

		if ( ! hasAnsweredPreviousQuestion ) {
			redirect( 'selectBlogType', { pathParams: { domainName } } );
		}
	}

	handleSubmit( { service } ) {
		const { redirect, domainName, updateDomain } = this.props;

		let nextPageSlug = '';
		if ( service === 'wpcom' || service === 'pressable' ) {
			nextPageSlug = 'connectingNewBlog';

			updateDomain( domainName, service )
				.then( () => {
					redirect( 'confirmConnectNewBlog', { pathParams: { domainName, service } } );
				} )
				.catch( noop );
		} else {
			nextPageSlug = 'connectNewBlogToOther';
		}

		redirect( nextPageSlug, { pathParams: { domainName, service } } );
	}

	isSubmitButtonDisabled() {
		const { invalid, pristine, submitting } = this.props;

		return invalid || pristine || submitting;
	}

	renderWpcom() {
		const {
			fields: { service },
		} = this.props;

		return (
			<label className={ styles.label } htmlFor="wpcom">
				<Radio
					className={ styles.radio }
					{ ...service }
					id="wpcom"
					value="wpcom"
					checked={ service.value === 'wpcom' }
				/>
				<h3 className={ styles.labelHeader }>
					WordPress.com
				</h3>
				<p className={ styles.labelDescription }>
					{
						i18n.translate( 'Create a free website or easily build a blog on WordPress.com.' +
							' Hundreds of free, customizable, mobile-ready designs and themes. ' +
							'Free hosting and support.' )
					}
				</p>
			</label>
		);
	}

	renderPressable() {
		const {
			fields: { service },
		} = this.props;

		return (
			<label className={ styles.label } htmlFor="pressable">
				<Radio
					className={ styles.radio }
					{ ...service }
					id="pressable"
					value="pressable"
					checked={ service.value === 'pressable' }
				/>
				<h3 className={ styles.labelHeader }>
					Pressable
				</h3>
				<p className={ styles.labelDescription }>
					{
						i18n.translate( 'Create a website or easily build a blog.' +
							' Hundreds of free, customizable, mobile-ready designs and themes. ' +
							'Upload your own themes and plugins.' )
					}
				</p>
			</label>
		);
	}

	render() {
		const {
			domainName,
			handleSubmit,
			needs,
		} = this.props;

		return (
			<SunriseStep>
				<DocumentTitle title={ i18n.translate( 'Set up domain' ) } />

				<SunriseStep.Header>
					<h1 className={ styles.header }>
						{ i18n.translate( 'Setup: {{strong}}Create a new blog{{/strong}}', {
							components: {
								strong: <strong />
							}
						} ) }
					</h1>
					<ProgressBar progress={ 60 } />
					<h2 className={ styles.subHeader }>
						{ preventWidows( i18n.translate( "Choose where you'd like to create your new blog." +
							" We'll connect {{strong}}%(domainName)s{{/strong}} for you and get you started creating your new blog.",
							{
								args: { domainName },
								components: { strong: <strong /> }
							}
						), 2 ) }
					</h2>
				</SunriseStep.Header>
				<Form onSubmit={ handleSubmit( this.handleSubmit ) }>
					<Form.FieldArea>
						<p>
							{ i18n.translate( 'Where would you like to create your new blog?' ) }
						</p>
						{ needs === 'simple' && this.renderWpcom() }

						{ needs === 'control' && this.renderPressable() }
					</Form.FieldArea>
					<Form.SubmitArea>
						<Button disabled={ this.isSubmitButtonDisabled() }>
							{ i18n.translate( 'Next' ) }
						</Button>
					</Form.SubmitArea>
					<Form.Footer>
						<h3>{ i18n.translate( 'Want a different blogging platform?' ) }</h3>
						<p>
							{ i18n.translate( 'We\'re adding more options soon, but in the meantime our Happiness Engineers can help you {{link}}create a new blog somewhere else{{/link}}.', {
								components: { link: <Link to={ getPath( 'connectNewBlogToOther', { domainName } ) } /> }
							} ) }
						</p>
					</Form.Footer>
				</Form>

				<SunriseStep.Footer>
					<Link to={ getPath( 'selectNewBlogNeeds', { domainName, needs } ) }>
						{ i18n.translate( 'Back' ) }
					</Link>
				</SunriseStep.Footer>
			</SunriseStep>
		);
	}
}

SelectNewBlogHost.propTypes = {
	domainName: PropTypes.string.isRequired,
	fields: PropTypes.object.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	hasAnsweredPreviousQuestion: PropTypes.bool.isRequired,
	invalid: PropTypes.bool.isRequired,
	needs: PropTypes.string.isRequired,
	pristine: PropTypes.bool.isRequired,
	redirect: PropTypes.func.isRequired,
	submitting: PropTypes.bool.isRequired,
	updateDomain: PropTypes.func.isRequired
};

export default withStyles( styles )( bindHandlers( SelectNewBlogHost ) );
