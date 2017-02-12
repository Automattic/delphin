// External dependencies
import { bindHandlers } from 'react-bind-handlers';
import i18n from 'i18n-calypso';
import { Link } from 'react-router';
import noop from 'lodash/noop';
import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import SetUpDomainBackLink from 'components/ui/set-up-domain/back-link';
import Button from 'components/ui/button';
import DocumentTitle from 'components/ui/document-title';
import { getPath } from 'routes';
import Form from 'components/ui/form';
import ProgressHeader from 'components/ui/set-up-domain/progress-header';
import Radio from 'components/ui/form/radio';
import styles from './styles.scss';
import { imageUrl } from 'lib/assets';
import withPageView from 'lib/analytics/with-page-view';

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
		const {
			invalid,
			pristine,
			submitting,
			fields: { service }
		} = this.props;

		const serviceMatchesNeeds = ! service.value || service.value === this.getServiceForNeeds();

		return invalid || pristine || submitting || ! serviceMatchesNeeds;
	}

	getServiceForNeeds() {
		const needsToServices = {
			control: 'pressable',
			simple: 'wpcom'
		};

		return needsToServices[ this.props.needs ];
	}

	handleHostClick( event ) {
		const host = event.target.value;

		this.props.recordTracksEvent( 'delphin_new_site_host_selection', { host } );
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
					onClick={ this.handleHostClick }
					checked={ service.value === 'wpcom' }
				/>
				<label className={ styles.label } htmlFor="wpcom">
					<h3 className={ styles.labelHeader }>
						<img src={ imageUrl( 'hosts/wordpress-horizontal-blue.svg' ) } alt="WordPress.com" height="30" />
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
					onClick={ this.handleHostClick }
					checked={ service.value === 'pressable' }
				/>
				<label className={ styles.label } htmlFor="pressable">
					<h3 className={ styles.labelHeader }>
						<img src={ imageUrl( 'hosts/pressable-logo-horz.svg' ) } alt="Pressable" height="30" />
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

				<ProgressHeader progress={ 60 }>
					{ i18n.translate( 'Create a new blog.' ) }
				</ProgressHeader>

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
					<SetUpDomainBackLink
						stepName="selectNewBlogHost"
						to={ getPath( 'selectNewBlogNeeds', { domainName, needs } ) }
					/>
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
	recordTracksEvent: PropTypes.func.isRequired,
	redirect: PropTypes.func.isRequired,
	submitting: PropTypes.bool.isRequired,
	updateDomain: PropTypes.func.isRequired
};

export default withStyles( styles )( withPageView( bindHandlers( SelectNewBlogHost ), 'Select New Blog Host' ) );
