// External dependencies
import { bindHandlers } from 'react-bind-handlers';
import compact from 'lodash/compact';
import i18n from 'i18n-calypso';
import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import Button from 'components/ui/button';
import DocumentTitle from 'components/ui/document-title';
import Form from 'components/ui/form';
import styles from './styles.scss';
import { removeInvalidInputProps } from 'lib/form';
import ValidationError from 'components/ui/form/validation-error';

class UpdateNameservers extends Component {
	componentWillMount() {
		const {
			domainName,
			fetchNameservers,
		} = this.props;

		fetchNameservers( domainName ).then( result => this.initializeForm( result.nameservers ) );
	}

	initializeForm( nameservers ) {
		const {
			initializeForm,
			fields,
		} = this.props;

		const form = Object.keys( fields ).reduce( ( currentForm, fieldName, index ) => {
			currentForm[ fieldName ] = nameservers[ index ] || '';
			return currentForm;
		}, {} );

		initializeForm( form );
	}

	handleSubmit( values ) {
		const {
			addNotice,
			domainName,
			redirect,
			updateNameservers,
		} = this.props;

		updateNameservers( domainName, compact( Object.values( values ) ) ).then( () => {
			redirect( 'myDomains' );

			addNotice( {
				message: i18n.translate( 'Your nameservers have been updated.' ),
				status: 'success'
			} );
		} ).catch( error => {
			// TODO: display a better error message
			addNotice( {
				message: error.message,
				status: 'error'
			} );
		} );
	}

	render() {
		const {
			handleSubmit,
			isRequestingNameservers,
		} = this.props;

		return (
			<div className={ styles.container }>
				<DocumentTitle title={ i18n.translate( 'Set up domain' ) } />

				<div className={ styles.header }>
					<h1 className={ styles.headerTitle }>{ i18n.translate( 'Edit name servers' ) }</h1>
				</div>

				<form className={ styles.form } onSubmit={ handleSubmit( this.handleSubmit ) }>
					<Form.FieldArea>
						<p className={ styles.instructions }>{ i18n.translate( 'Use custom name servers to manage your domain outside of get.blog, or to point it to a provider that get.blog doesn\'t support.' ) }</p>

						{ Object.keys( this.props.fields ).map( ( fieldName, index ) => (
							<div className={ styles.fieldContainer } key={ fieldName }>
								<label htmlFor={ fieldName }>
									{ i18n.translate( 'Name server %(number)d', { args: { number: index + 1 } } ) }
								</label>

								<input
									disabled={ isRequestingNameservers }
									placeholder={ `ns${ ( index + 1 ) }.wordpress.com` }
									{ ...removeInvalidInputProps( this.props.fields[ fieldName ] ) }
								/>
								<ValidationError field={ this.props.fields[ fieldName ] } />
							</div>
						) ) }
					</Form.FieldArea>

					<Form.SubmitArea>
						<Button className={ styles.button } disabled={ isRequestingNameservers }>
							{ i18n.translate( 'Set name servers' ) }
						</Button>
					</Form.SubmitArea>

					<Form.Footer className={ styles.nameserverFooter } >
						<p>{ i18n.translate( 'Note that a wrong setting here can make your domain stop working. You can reset back to the default name servers at any time under My Domains.' ) }</p>
					</Form.Footer>
				</form>

				<div className={ styles.cancel }>
					<a onClick={ this.props.goBack }>
						{ i18n.translate( 'Cancel' ) }
					</a>
				</div>
			</div>
		);
	}
}

UpdateNameservers.propTypes = {
	addNotice: PropTypes.func.isRequired,
	domainName: PropTypes.string.isRequired,
	fetchNameservers: PropTypes.func.isRequired,
	fields: PropTypes.object.isRequired,
	goBack: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	initializeForm: PropTypes.func.isRequired,
	isRequestingNameservers: PropTypes.bool.isRequired,
	redirect: PropTypes.func.isRequired,
	updateNameservers: PropTypes.func.isRequired,
};

export default withStyles( styles )( bindHandlers( UpdateNameservers ) );
