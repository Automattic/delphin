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
import ProgressBar from 'components/ui/progress-bar';
import Radio from 'components/ui/form/radio';
import styles from './styles.scss';

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
			<div className={ styles.serviceOption }>
				<Radio
					className={ styles.radio }
					{ ...service }
					id="wpcom"
					value="wpcom"
					checked={ service.value === 'wpcom' }
				/>
				<label className={ styles.label } htmlFor="wpcom">
					<h3 className={ styles.labelHeader }>
						WordPress.com
					</h3>
					<p className={ styles.labelDescription }>
						{
							i18n.translate( 'Easily build a blog on WordPress.com.' +
								' Hundreds of customizable, mobile-ready designs and themes. ' )
						}
					</p>
				</label>
			</div>
		);
	}

	renderPressable() {
		const {
			fields: { service },
		} = this.props;

		return (
			<div>
				<Radio
					className={ styles.radio }
					{ ...service }
					id="pressable"
					value="pressable"
					checked={ service.value === 'pressable' }
				/>
				<label className={ styles.label } htmlFor="pressable">
					<h3 className={ styles.labelHeader }>
						Pressable
					</h3>
					<p className={ styles.labelDescription }>
						{
							i18n.translate( 'Managed WordPress Hosting that delivers reliability, ' +
								'security and speed backed by expert support.' )
						}
					</p>
				</label>
			</div>
		);
	}

	render() {
		const {
			domainName,
			handleSubmit,
			needs,
		} = this.props;

		return (
			<div className={ styles.domainSetup }>
				<DocumentTitle title={ i18n.translate( 'Set up domain' ) } />

				<div className={ styles.headerContainer }>
					<div className={ styles.header }>
						<h1 className={ styles.headerText }>
							<span className={ styles.setUpLabel }>
								{ i18n.translate( 'Setup: ' ) }
							</span>

							{ i18n.translate( 'Create a new blog.' ) }
						</h1>
						<ProgressBar progress={ 60 } />
					</div>
				</div>

				<Form onSubmit={ handleSubmit( this.handleSubmit ) }>
					<Form.FieldArea>
						<p className={ styles.actionLabel }>
							{ i18n.translate( 'Where would you like to start your new blog?' ) }
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
							{ i18n.translate( 'We\'ll be adding more options for automatic set up soon. In the meantime, our Domain Assistants can help you {{link}}find the best place to start your new blog{{/link}}.', {
								components: { link: <Link to={ getPath( 'connectNewBlogToOther', { domainName } ) } /> }
							} ) }
						</p>
					</Form.Footer>
				</Form>

				<div className={ styles.footer }>
					<Link to={ getPath( 'selectNewBlogNeeds', { domainName, needs } ) }>
						{ i18n.translate( 'Back' ) }
					</Link>
				</div>
			</div>
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
