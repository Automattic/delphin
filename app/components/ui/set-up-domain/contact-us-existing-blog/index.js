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
						<h1 className={ styles.headerText }>{ i18n.translate( 'Submit Your Request' ) }</h1>
						<ProgressBar progress={ 90 } />
						<h2 className={ styles.subHeaderText }>
							{ i18n.translate( 'We found {{strong}}%(domainName)s{{/strong}}, however, ' +
								"at this time we aren't able to automatically connect your blog (we're working on it though!).",
								{
									args: { domainName },
									components: { strong: <strong /> }
								}
							) }
							{ ' ' }
							{ i18n.translate( 'Our Happiness Engineers will assist you in connecting to your existing blog.' ) }
						</h2>
					</div>
				</div>

				<Form onSubmit={ this.handleSubmit }>
					<Form.FieldArea>
						<strong>
							{ i18n.translate( 'Connect %(domainName)s to %(hostName)s.', {
								args: { domainName, hostName }
							} ) }
						</strong>
						<p className={ styles.paragraph }>
							{ i18n.translate( 'Let us know any additional information about your request that we might need to know.' ) }
						</p>

						<textarea
							className={ styles.message }
							{ ...removeInvalidInputProps( message ) }
						/>

						<p className={ styles.paragraph }>
							{ i18n.translate( 'Once you submit your request to our Happiness Engineers, we will get started connecting your blog.' ) }
							{ ' ' }
							{ i18n.translate( 'We will contact you once your request has been completed or if we have further questions.' ) }
						</p>
					</Form.FieldArea>

					<Form.SubmitArea>
						<Link to={ getPath( 'findExistingBlog', { domainName } ) }>
							{ i18n.translate( 'Back' ) }
						</Link>
						<Button disabled={ ! message.value || isContactingSupport }>
							{ i18n.translate( 'Submit Request' ) }
						</Button>
					</Form.SubmitArea>
				</Form>

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
