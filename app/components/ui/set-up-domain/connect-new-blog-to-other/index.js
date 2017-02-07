// External dependencies
import { bindHandlers } from 'react-bind-handlers';
import i18n from 'i18n-calypso';
import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import SetUpDomainBackLink from 'components/ui/set-up-domain/back-link';
import Button from 'components/ui/button';
import CustomNameServersLink from 'components/ui/set-up-domain/custom-name-servers-link';
import DocumentTitle from 'components/ui/document-title';
import Form from 'components/ui/form';
import { getPath } from 'routes';
import ProgressHeader from 'components/containers/set-up-domain/progress-header';
import styles from './styles.scss';
import { removeInvalidInputProps } from 'lib/form';
import withPageView from 'lib/analytics/with-page-view';

class ConnectNewBlogToOther extends Component {
	handleSubmit( { providerText } ) {
		const {
			addNotice,
			contactSupport,
			recordTracksEvent,
			domainName,
			redirect,
		} = this.props;

		recordTracksEvent( 'delphin_support_form_submit', {
			source: 'setup',
			setup_type: 'new'
		} );

		contactSupport( {
			blogType: 'new',
			domainName,
			message: providerText
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
			handleSubmit,
			isContactingSupport,
			fields: { providerText },
			needs,
		} = this.props;

		return (
			<div className={ styles.domainSetup }>
				<DocumentTitle title={ i18n.translate( 'Set up domain' ) } />

				<ProgressHeader progress={ 90 }>
					{ i18n.translate( 'Meet your domain assistant.', {
						comment: 'The domain assistant is our customer support team'
					} ) }
				</ProgressHeader>

				<Form onSubmit={ handleSubmit( this.handleSubmit ) }>
					<Form.FieldArea>
						<div className={ styles.paragraph }>
							{ i18n.translate( 'We can help you find the best place to start a blog and make it work with %(domainName)s.', {
								args: { domainName }
							} ) }
						</div>
						<div className={ styles.paragraph }>
							{ i18n.translate( 'Let us know what you want from your new blog, and we\'ll get back to you soon.' ) }
						</div>

						<textarea
							id="providerText"
							name="providerText"
							placeholder={ i18n.translate( 'What do you want in your blog?' ) }
							rows="4"
							className={ styles.otherProviderText }
							{ ...removeInvalidInputProps( providerText ) } />
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
						stepName="connectNewBlogToOther"
						to={ getPath( 'selectNewBlogHost', { domainName, needs } ) }
					/>
				</div>
			</div>
		);
	}
}

ConnectNewBlogToOther.propTypes = {
	addNotice: PropTypes.func.isRequired,
	contactSupport: PropTypes.func.isRequired,
	domainName: PropTypes.string.isRequired,
	fields: PropTypes.object.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	isContactingSupport: PropTypes.bool.isRequired,
	needs: PropTypes.string.isRequired,
	recordTracksEvent: PropTypes.func.isRequired,
	redirect: PropTypes.func.isRequired,
};

export default withStyles( styles )( withPageView( bindHandlers( ConnectNewBlogToOther ), 'Connect New Blog To Other' ) );
