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

				<div className={ styles.headerContainer }>
					<div className={ styles.header }>
						<h1 className={ styles.headerText }>{ i18n.translate( 'Contact our domain assistant' ) }</h1>
						<ProgressBar progress={ 90 } />
					</div>
				</div>
				<Form onSubmit={ handleSubmit( this.handleSubmit ) }>
					<Form.FieldArea>
						<p>
							{ i18n.translate( 'How can we get %(domainName)s set up the way you want it?', {
								args: { domainName }
							} ) }
						</p>
						<div className={ styles.paragraph }>
							{ i18n.translate( 'While we work on adding more ways to automatically connect, we can set it up for you personally. Let us know below what kind of blog you want.' ) }
						</div>

						<textarea
							id="providerText"
							name="providerText"
							placeholder={ i18n.translate( 'Tell us what kind of blog you want.' ) }
							rows="4"
							className={ styles.otherProviderText }
							{ ...removeInvalidInputProps( providerText ) } />
					</Form.FieldArea>
					<Form.SubmitArea>
						<Button disabled={ ! providerText.value || isContactingSupport }>
							{ i18n.translate( 'Contact our domain assistant' ) }
						</Button>
					</Form.SubmitArea>
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
