// External dependencies
import { bindHandlers } from 'react-bind-handlers';
import compact from 'lodash/compact';
import i18n from 'i18n-calypso';
import { Link } from 'react-router';
import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import Button from 'components/ui/button';
import DocumentTitle from 'components/ui/document-title';
import { getPath } from 'routes';
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
			domainName,
			handleSubmit,
			isRequestingNameservers,
		} = this.props;

		return (
			<div className={ styles.container }>
				<DocumentTitle title={ i18n.translate( 'Set up domain' ) } />

				<div className={ styles.header }>
					<h1>{ i18n.translate( 'Edit Nameservers' ) }</h1>
				</div>

				<form className={ styles.form } onSubmit={ handleSubmit( this.handleSubmit ) }>
					<Form.FieldArea>
						{ Object.keys( this.props.fields ).map( ( fieldName, index ) => (
							<div className={ styles.fieldContainer } key={ fieldName }>
								<label htmlFor={ fieldName }>
									{ i18n.translate( 'Nameserver %(number)d', { args: { number: index + 1 } } ) }
								</label>

								<input
									disabled={ isRequestingNameservers }
									placeholder={ `ns${ ( index + 1 ) }.wordpress.com` }
									{ ...removeInvalidInputProps( this.props.fields[ fieldName ] ) }
								/>
								<ValidationError field={ this.props.fields[ fieldName ] } />
							</div>
						) ) }

						<Button className={ styles.button } disabled={ isRequestingNameservers }>
							{ i18n.translate( 'Set nameservers' ) }
						</Button>
					</Form.FieldArea>
				</form>

				<div className={ styles.cancel }>
					<Link to={ getPath( 'selectBlogType', { domainName } ) }>
						{ i18n.translate( 'Cancel' ) }
					</Link>
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
	handleSubmit: PropTypes.func.isRequired,
	initializeForm: PropTypes.func.isRequired,
	isRequestingNameservers: PropTypes.bool.isRequired,
	redirect: PropTypes.func.isRequired,
	updateNameservers: PropTypes.func.isRequired,
};

export default withStyles( styles )( bindHandlers( UpdateNameservers ) );
