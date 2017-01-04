// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { bindHandlers } from 'react-bind-handlers';

// Internal dependencies
import ContactInformationFormFactory from 'components/containers/contact-information-form-factory';
import DocumentTitle from 'components/ui/document-title';
import styles from './styles.scss';
import withPageView from 'lib/analytics/with-page-view';

const UpdateContactInformationForm = ContactInformationFormFactory( 'updateContactInformation' );

class UpdateContactInformation extends React.Component {
	componentWillMount() {
		if ( ! this.props.domains.hasLoadedFromServer && ! this.props.domains.isRequesting ) {
			this.props.fetchMyDomains();
		}
	}

	isDomainsReady() {
		return this.props.domains.isRequesting || ! this.props.domains.hasLoadedFromServer;
	}

	handleFormValidation( values ) {
		const domains = this.props.domains.data.results.map( domain => domain.name );
		return this.props.validateContactInformation( domains, values );
	}

	handleFormSubmission( values ) {
		const domains = this.props.domains.data.results.map( domain => domain.name );
		return this.props.updateContactInformation( domains, values )
			.then( () => {
				const { redirectToMyDomains, addNotice } = this.props;
				redirectToMyDomains();
				addNotice( {
					message: i18n.translate( "We've updated your domains contact information!" ),
					status: 'success'
				} );
			} )
			.catch( error => {
				const { addNotice } = this.props;

				addNotice( {
					message: i18n.translate( 'Failed to update contact information: %(errorMessage)s', {
						args: {
							errorMessage: error.message
						}
					} ),
					status: 'error'
				} );
				return Promise.reject( error );
			} );
	}

	getWhoisPrivacyNotice() {
		return i18n.translate( 'Your contact information will be available in a public' +
			' database of domain owners, called "Whois".' );
	}

	getAffectedDomainsNotice() {
		return <div>
			<h4 className={ styles.text }>{ i18n.translate( 'Changes will apply to the following domains:' ) }</h4>
			{ this.isDomainsReady()
				? i18n.translate( 'Loading your domains…' )
				: <ul>
				{
					this.props.domains.data.results.map( domain => <li key={ domain.id }>{ domain.name }</li> )
				}
			</ul> }
			{ i18n.translate( 'You may be asked to approve these changes for each domain separately. ' +
				"We'll email you with instructions." ) }
		</div>;
	}

	render() {
		return (
			<DocumentTitle title={ i18n.translate( 'Update Contact Information' ) }>
				<div>
					<div className={ styles.header }>
						<h2 className={ styles.heading }>
							{ i18n.translate( 'Update your contact information' ) }
						</h2>

						<h3 className={ styles.text }>
							{
								i18n.translate( 'Domain owners are required to provide valid contact information for ' +
									'every domain, including email address, physical address, and phone number. ' +
									'Please make sure your details below are correct and up-to-date.' )
							}
						</h3>
					</div>

					<UpdateContactInformationForm
						onValidate={ this.handleFormValidation }
						onFormSubmit={ this.handleFormSubmission }
						submitButtonLabel={ i18n.translate( 'Update contact information' ) }
						submitButtonSubmittingLabel={ i18n.translate( 'Updating WHOIS data…' ) }
						preSubmitContent={ this.getAffectedDomainsNotice() }
						footerContent={ this.getWhoisPrivacyNotice() }
						submitDisabled={ this.isDomainsReady() }
					/>
				</div>
			</DocumentTitle>
		);
	}
}

UpdateContactInformation.propTypes = {
	addNotice: PropTypes.func.isRequired,
	domains: PropTypes.object.isRequired,
	fetchMyDomains: PropTypes.func.isRequired,
	redirectToMyDomains: PropTypes.func.isRequired,
	updateContactInformation: PropTypes.func.isRequired,
	validateContactInformation: PropTypes.func.isRequired
};

export default withStyles( styles )( withPageView( bindHandlers( UpdateContactInformation ), 'Update Contact Information' ) );
