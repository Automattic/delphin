// External dependencies
import i18n from 'i18n-calypso';
import React, { Component, PropTypes } from 'react';

// Internal dependencies
import SetUpDomainBackLink from 'components/ui/set-up-domain/back-link';
import Button from 'components/ui/button';
import Form from 'components/ui/form';
import { getPath } from 'routes';
import ProgressBar from 'components/ui/progress-bar';
import styles from './styles.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { removeInvalidInputProps } from 'lib/form';
import CustomNameServersLink from 'components/ui/set-up-domain/custom-name-servers-link';
import withPageView from 'lib/analytics/with-page-view';

class ContactUsExistingBlog extends Component {
	constructor( props ) {
		super( props );

		// submit through the redux-form submit handler
		this.handleSubmit = this.props.handleSubmit( this.handleSubmit.bind( this ) );
	}

	handleSubmit() {
		const {
			addNotice,
			contactSupport,
			recordTracksEvent,
			domainName,
			hostName,
			redirect,
			fields: { message }
		} = this.props;

		recordTracksEvent( 'delphin_support_form_submit', {
			source: 'setup',
			setup_type: 'existing'
		} );

		contactSupport( {
			blogType: 'existing',
			domainName,
			hostName,
			message: message.value
		} ).then( () => {
			redirect( 'myDomains' );

			addNotice( {
				status: 'success',
				message: i18n.translate( "Your request has been sent. We'll be in touch with you soon." )
			} );
		} ).catch( () => {
			addNotice( {
				status: 'error',
				message: i18n.translate( 'There was an error when sending your request.' )
			} );
		} );
	}

	render() {
		const {
			domainName,
			hostName,
			isContactingSupport,
			fields: { message },
		} = this.props;

		return (
			<div className={ styles.domainSetup }>
				<div className={ styles.headerContainer }>
					<div className={ styles.header }>
						<h1 className={ styles.headerText }>
							<span className={ styles.setUpLabel }>
								{ i18n.translate( 'Setup: ' ) }
							</span>

							{ i18n.translate( 'Meet your domain assistant.', {
								comment: 'The domain assistant is our customer support team'
							} ) }
						</h1>
						<ProgressBar progress={ 90 } />
					</div>
				</div>

				<Form onSubmit={ this.handleSubmit }>
					<Form.FieldArea>
						<div className={ styles.paragraph }>
							{ i18n.translate( 'We found %(hostName)s and we think it will be fastest and easiest if we set it up for you personally.', {
								args: { hostName }
							} ) }
						</div>
						<div className={ styles.paragraph }>
							{ i18n.translate( 'Let us know what you want from your new domain, and we\'ll get back to you soon.' ) }
						</div>

						<textarea
							className={ styles.message }
							placeholder={ i18n.translate( 'How do you want to connect your new domain?' ) }
							rows="4"
							{ ...removeInvalidInputProps( message ) }
						/>
					</Form.FieldArea>

					<Form.SubmitArea>
						<Button disabled={ isContactingSupport }>
							{ i18n.translate( 'Contact domain assistant', {
								comment: 'The domain assistant is our customer support team'
							} ) }
						</Button>
					</Form.SubmitArea>

					<Form.Footer>
						<CustomNameServersLink domainName={ domainName } />
					</Form.Footer>
				</Form>

				<div className={ styles.footer }>
					<SetUpDomainBackLink
						to={ getPath( 'findExistingBlog', { domainName } ) }
						stepName="contactUsExistingBlog"
					/>
				</div>
			</div>
		);
	}
}

ContactUsExistingBlog.propTypes = {
	addNotice: PropTypes.func.isRequired,
	contactSupport: PropTypes.func.isRequired,
	domainName: PropTypes.string.isRequired,
	fields: PropTypes.object.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	hostName: PropTypes.string.isRequired,
	isContactingSupport: PropTypes.bool.isRequired,
	recordTracksEvent: PropTypes.func.isRequired,
	redirect: PropTypes.func.isRequired,
};

export default withStyles( styles )( withPageView( ContactUsExistingBlog, 'Contact Us Existing Blog' ) );
