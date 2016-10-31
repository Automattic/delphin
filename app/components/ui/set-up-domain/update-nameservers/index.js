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
import SunriseStep from 'components/ui/sunrise-step';
import { removeInvalidInputProps } from 'lib/form';
import ValidationError from 'components/ui/form/validation-error';

class UpdateNameservers extends Component {
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
		} = this.props;

		return (
			<SunriseStep>
				<DocumentTitle title={ i18n.translate( 'Set up domain' ) } />

				<SunriseStep.Header>
					<h1>{ i18n.translate( 'Give me nameservers' ) }</h1>
				</SunriseStep.Header>

				<Form onSubmit={ handleSubmit( this.handleSubmit ) }>
					<Form.FieldArea>
						<label>
							{ i18n.translate( 'Are you ready to setup %(domainName)s?', {
								args: { domainName }
							} ) }
						</label>

						{ Object.keys( this.props.fields ).map( ( fieldName, index ) => (
							<div key={ fieldName }>
								<label htmlFor={ fieldName }>
									{ i18n.translate( 'Nameserver %(number)d', { args: { number: index + 1 } } ) }
								</label>

								<input
									placeholder={ `ns${ ( index + 1 ) }.wordpress.com` }
									{ ...removeInvalidInputProps( this.props.fields[ fieldName ] ) }
								/>
								<ValidationError field={ this.props.fields[ fieldName ] } />
							</div>
						) ) }

						<Button className={ styles.button }>
							{ i18n.translate( 'Yes, Go On' ) }
						</Button>
					</Form.FieldArea>
				</Form>

				<SunriseStep.Footer>
					<Link to={ getPath( 'findExistingBlog', { domainName } ) }>
						{ i18n.translate( 'Back' ) }
					</Link>
				</SunriseStep.Footer>
			</SunriseStep>
		);
	}
}

UpdateNameservers.propTypes = {
	addNotice: PropTypes.func.isRequired,
	domainName: PropTypes.string.isRequired,
	fields: PropTypes.object.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	isUpdatingNameservers: PropTypes.bool.isRequired,
	redirect: PropTypes.func.isRequired,
	updateNameservers: PropTypes.func.isRequired,
};

export default withStyles( styles )( bindHandlers( UpdateNameservers ) );
