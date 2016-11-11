// External dependencies
import { bindHandlers } from 'react-bind-handlers';
import i18n from 'i18n-calypso';
import { Link } from 'react-router';
import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import Button from 'components/ui/button';
import DocumentTitle from 'components/ui/document-title';
import Form from 'components/ui/form';
import { getPath } from 'routes';
import { preventWidows } from 'lib/formatters';
import ProgressBar from 'components/ui/progress-bar';
import styles from './styles.scss';
import { removeInvalidInputProps } from 'lib/form';

class ConnectNewBlogToOther extends Component {
	handleSubmit( { providerText } ) {
		const {
			addNotice,
			domainName,
			redirect,
		} = this.props;

		this.props.contactSupport( {
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

				<div className={ styles.header }>
					<h1 className={ styles.headerText }>{ i18n.translate( 'Where would you like to connect?' ) }</h1>
					<ProgressBar progress={ 90 } />
					<h2 className={ styles.subHeaderText }>
						{ preventWidows( i18n.translate( 'We found {{strong}}%(domainName)s{{/strong}}, but at this time we aren\'t able to automatically connect your blog (we\'re working on it though!)',
							{
								args: { domainName },
								components: { strong: <strong /> }
							}
						), 2 ) }
					</h2>
				</div>
				<Form onSubmit={ handleSubmit( this.handleSubmit ) }>
					<Form.FieldArea>
						<label className={ styles.label } htmlFor="providerText">
							{ i18n.translate( 'Let us know any additional information about your request we might need to know.' ) }
						</label>
						<textarea
							id="providerText"
							name="providerText"
							className={ styles.otherProviderText }
							{ ...removeInvalidInputProps( providerText ) } />
					</Form.FieldArea>
					<Form.SubmitArea>
						<Button disabled={ ! providerText.value || isContactingSupport }>
							{ i18n.translate( 'Submit my request' ) }
						</Button>
					</Form.SubmitArea>
					<Form.Footer>
						<p>
							{ i18n.translate( 'Once you submit your request our Happiness Engineers will get started connecting your blog. We will contact you once your request has been completed or if we have further questions.' ) }
						</p>
					</Form.Footer>
				</Form>

				<div className={ styles.footer }>
					<Link to={ getPath( 'selectNewBlogHost', { domainName, needs } ) }>
						{ i18n.translate( 'Back' ) }
					</Link>
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
	redirect: PropTypes.func.isRequired,
};

export default withStyles( styles )( bindHandlers( ConnectNewBlogToOther ) );
