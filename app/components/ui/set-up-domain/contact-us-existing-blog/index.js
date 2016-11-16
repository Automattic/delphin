// External dependencies
import i18n from 'i18n-calypso';
import { Link } from 'react-router';
import React, { Component, PropTypes } from 'react';

// Internal dependencies
import Button from 'components/ui/button';
import Form from 'components/ui/form';
import { getPath } from 'routes';
import ProgressBar from 'components/ui/progress-bar';
import styles from './styles.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { removeInvalidInputProps } from 'lib/form';

class ContactUsExistingBlog extends Component {
	constructor( props ) {
		super( props );

		// submit through the redux-form submit handler
		this.handleSubmit = this.props.handleSubmit( this.handleSubmit.bind( this ) );
	}

	handleSubmit() {
		const {
			addNotice,
			domainName,
			hostName,
			redirect,
			fields: { message }
		} = this.props;

		this.props.contactSupport( {
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
						<h1 className={ styles.headerText }>{ i18n.translate( 'Contact our domain assistant' ) }</h1>
						<ProgressBar progress={ 90 } />
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
							{ i18n.translate( 'We found %(hostName)s and we think it will be fastest and easiest if we set it up for you personally. Let us know below how you want your domain to work.', {
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
				</Form>

				<div className={ styles.footer }>
					<Link to={ getPath( 'findExistingBlog', { domainName } ) }>
						{ i18n.translate( 'Back' ) }
					</Link>
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
	redirect: PropTypes.func.isRequired,
};

export default withStyles( styles )( ContactUsExistingBlog );
