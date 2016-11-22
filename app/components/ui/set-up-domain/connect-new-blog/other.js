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
						<h1 className={ styles.headerText }>
							<span className={ styles.setUpLabel }>
								{ i18n.translate( 'Setup: ' ) }
							</span>

							{ i18n.translate( 'Meet your domain assistant.' ) }
						</h1>
						<ProgressBar progress={ 90 } />
					</div>
				</div>
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
							{ i18n.translate( 'Contact domain assistant' ) }
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
