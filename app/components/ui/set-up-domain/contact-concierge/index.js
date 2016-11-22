// External dependencies
import { bindHandlers } from 'react-bind-handlers';
import i18n from 'i18n-calypso';
import { Link } from 'react-router';
import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import Button from 'components/ui/button';
import Form from 'components/ui/form';
import { getPath } from 'routes';
import { removeInvalidInputProps } from 'lib/form';
import styles from './styles.scss';

class ContactConcierge extends Component {
	handleSubmit( event ) {
		event.preventDefault();

		const {
			addNotice,
			redirect,
			domainName,
			hostName,
			fields: { message },
		} = this.props;

		this.props.contactSupport( {
			blogType: hostName ? 'existing' : 'new',
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
						<h1 className={ styles.headerText }>{ i18n.translate( 'Contact our domain assistant' ) }</h1>
					</div>
				</div>

				<Form onSubmit={ this.handleSubmit }>
					<Form.FieldArea>
						<p>
							{ i18n.translate( 'How can we get %(domainName)s set up the way you want it?', {
								args: { domainName }
							} ) }
						</p>
						<div className={ styles.paragraph }>
							{ i18n.translate( 'Let us know below how you want your domain to work.', {
								args: { hostName }
							} ) }
						</div>

						<textarea
							className={ styles.message }
							placeholder={ i18n.translate( 'Tell us what you want to do with your domain.' ) }
							rows="4"
							{ ...removeInvalidInputProps( message ) }
						/>
					</Form.FieldArea>

					<Form.SubmitArea>
						<Button disabled={ ! message.value || isContactingSupport }>
							{ i18n.translate( 'Contact our domain assistant' ) }
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
					<Link to={ getPath( 'myDomains' ) }>
						{ i18n.translate( 'Back' ) }
					</Link>
				</div>
			</div>
		);
	}
}

ContactConcierge.propTypes = {
	addNotice: PropTypes.func.isRequired,
	contactSupport: PropTypes.func.isRequired,
	domainName: PropTypes.string.isRequired,
	fields: PropTypes.object.isRequired,
	hostName: PropTypes.string,
	isContactingSupport: PropTypes.bool.isRequired,
	redirect: PropTypes.func.isRequired,
};

export default withStyles( styles )( bindHandlers( ContactConcierge ) );
