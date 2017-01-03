// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { bindHandlers } from 'react-bind-handlers';

// Internal dependencies
import Button from 'components/ui/button';
import Country from 'components/containers/country';
import Form from 'components/ui/form';
import HowdyMessage from './howdy-message';
import Input from 'components/ui/form/input';
import { isCallingCode } from 'lib/form';
import Phone from 'components/ui/form/phone';
import State from 'components/ui/form/state';
import styles from './styles.scss';
import ValidationError from 'components/ui/form/validation-error';

class ContactInformationForm extends React.Component {
	componentWillMount() {
		if ( ! this.props.userLocation.isRequesting && ! this.props.userLocation.hasLoadedFromServer ) {
			this.props.fetchLocation();
		}

		if ( ! this.props.contactInformation.isRequesting && ! this.props.contactInformation.hasLoadedFromServer ) {
			this.props.fetchContactInformation();
		}

		if ( this.props.contactInformation.hasLoadedFromServer ) {
			this.initializeContactInformation();
		}

		if ( this.canUpdateCountryFromLocation() ) {
			this.setCountryCode();
		}

		this.props.resetInputVisibility();
	}

	componentWillReceiveProps( nextProps ) {
		if ( this.isDataLoading() && ! this.isDataLoading( nextProps ) ) {
			this.initializeContactInformation( nextProps );
		}

		if ( ! this.canUpdateCountryFromLocation() && this.canUpdateCountryFromLocation( nextProps ) ) {
			this.setCountryCode( nextProps );
		}

		if ( this.shouldFetchStates( nextProps ) ) {
			this.props.fetchStates( nextProps.fields.countryCode.value );

			if ( this.props.fields.countryCode.value ) {
				// Reset the state field every time the user selects a
				// different country, but only if a country was previously
				// selected
				this.props.fields.state.onChange( '' );
			}
		}
	}

	initializeContactInformation( props = this.props ) {
		const form = Object.keys( props.fields ).reduce( ( result, fieldName ) => {
			let value = props.fields[ fieldName ].value || props.contactInformation.data[ fieldName ] || '';

			if ( fieldName === 'phone' && props.contactInformation.data.phone ) {
				const existingPhoneValue = props.fields.phone.value;
				const newPhoneValue = props.contactInformation.data.phone;

				if ( ! existingPhoneValue || isCallingCode( parseInt( existingPhoneValue ) ) ) {
					// we should overwrite this field if it contains only a
					// calling code or is empty
					value = newPhoneValue;
				}
			}

			// If we didn't got an email from the contactInformation above,
			// lets set it to logged in user's email
			if ( fieldName === 'email' && ! value ) {
				value = props.initialEmail;
			}

			return Object.assign( result, { [ fieldName ]: value } );
		}, {} );

		props.initializeForm( form );

		this.handleFirstNameBlur();
	}

	setCountryCode( props = this.props ) {
		let countryCode;

		// Use the GEO location
		if ( props.userLocation.hasLoadedFromServer ) {
			countryCode = props.userLocation.data.countryCode;
		}

		if ( props.contactInformation.hasLoadedFromServer && props.contactInformation.data.countryCode ) {
			// Over-ride the GEO location if the user has contact information.
			countryCode = props.contactInformation.data.countryCode;
		}

		if ( countryCode ) {
			props.fields.countryCode.onChange( countryCode );
		}
	}

	canUpdateCountryFromLocation( props = this.props ) {
		return ! this.isDataLoading( props ) &&
			( props.userLocation.hasLoadedFromServer || props.userLocation.hasFailedToLoad );
	}

	shouldFetchStates( nextProps ) {
		return this.props.fields.countryCode.value !== nextProps.fields.countryCode.value && nextProps.fields.countryCode.value !== '';
	}

	isDataLoading( props = this.props ) {
		return ! props.contactInformation.hasLoadedFromServer;
	}

	isSubmitButtonDisabled() {
		const { asyncValidating, invalid, submitting, submitDisabled } = this.props;

		return submitDisabled || asyncValidating || invalid || submitting || this.isDataLoading();
	}

	address2InputIsVisible() {
		const { inputVisibility: { address2InputIsVisible }, fields: { address2 } } = this.props;

		return address2InputIsVisible || address2.initialValue;
	}

	organizationInputIsVisible() {
		const { inputVisibility: { organizationInputIsVisible }, fields: { organization } } = this.props;

		return organizationInputIsVisible || organization.initialValue;
	}

	getSubmitButtonText() {
		const { asyncValidating, submitting, submitButtonLabel, submitButtonSubmittingLabel } = this.props;

		if ( asyncValidating ) {
			return i18n.translate( 'Checking your details…' );
		}

		if ( submitting ) {
			return submitButtonSubmittingLabel;
		}

		return submitButtonLabel;
	}

	handleFirstNameBlur() {
		this.props.handleStopEditingFirstName();

		this.props.fields.firstName.onBlur( event.target.value );
	}

	handleFirstNameChange( event ) {
		this.props.handleStartEditingFirstName();

		this.props.fields.firstName.onChange( event.target.value );
	}

	isHowdyMessageVisible() {
		const {
			isUpdatingFirstName,
			fields: { firstName }
		} = this.props;

		return firstName.value && ! isUpdatingFirstName;
	}

	render() {
		const { fields, handleSubmit, untouch } = this.props;

		return (
			<Form
				onSubmit={ handleSubmit( this.props.onFormSubmit ) }
				errors={ this.props.errors }
				focusOnError
			>
				<Form.FieldArea>
					<div>
						<fieldset>
							{ this.isHowdyMessageVisible() && ( <HowdyMessage firstName={ fields.firstName.value } email={ fields.email.value } /> ) }

							<label>{ i18n.translate( 'First Name' ) }</label>

							<Input
								disabled={ this.isDataLoading() }
								field={ fields.firstName }
								autoFocus
								untouch={ untouch }
								className={ styles.firstName }
								placeholder={ i18n.translate( 'First Name' ) }
								dir="ltr"
								onBlur={ this.handleFirstNameBlur }
								onChange={ this.handleFirstNameChange }
							/>
							<ValidationError field={ fields.firstName } />
						</fieldset>

						<fieldset>
							<label>{ i18n.translate( 'Last Name' ) }</label>
							<Input
								disabled={ this.isDataLoading() }
								field={ fields.lastName }
								untouch={ untouch }
								className={ styles.lastName }
								placeholder={ i18n.translate( 'Last Name' ) }
								dir="ltr"
							/>
							<ValidationError field={ fields.lastName } />
						</fieldset>

						{ ! this.organizationInputIsVisible() && (
							<a className={ styles.showOrganizationLink } onClick={ this.props.showOrganizationInput }>
								{ i18n.translate( 'Registering for a company? Add Organization name.' ) }
							</a>
						) }

						{ this.organizationInputIsVisible() && (
							<fieldset>
								<label>{ i18n.translate( 'Organization' ) }</label>
								<Input
									autoFocus
									field={ fields.organization }
									untouch={ untouch }
									className={ styles.organization }
									disabled={ this.isDataLoading() }
									placeholder={ i18n.translate( 'Organization' ) }
									dir="ltr"
								/>
								<ValidationError field={ fields.organization } />
							</fieldset>
						) }

						<fieldset>
							<label>{ i18n.translate( 'Email' ) }</label>
							<Input
								disabled={ this.isDataLoading() }
								field={ fields.email }
								placeholder={ i18n.translate( 'Email' ) }
								untouch={ untouch }
								type="email"
								dir="ltr"
							/>
							<ValidationError field={ fields.email } />
						</fieldset>

						<fieldset>
							<label>{ i18n.translate( 'Address' ) }</label>

							<Input
								field={ fields.address1 }
								untouch={ untouch }
								className={ styles.address1 }
								disabled={ this.isDataLoading() }
								placeholder={ i18n.translate( 'Address Line 1' ) }
								dir="ltr"
							/>

							{ this.address2InputIsVisible() && (
								<Input
									autoFocus
									field={ fields.address2 }
									untouch={ untouch }
									className={ styles.address2 }
									disabled={ this.isDataLoading() }
									placeholder={ i18n.translate( 'Address Line 2' ) }
									dir="ltr"
								/>
							) }

							<ValidationError fields={ [ fields.address1, fields.address2 ] } />

							{ ! this.address2InputIsVisible() && (
								<a className={ styles.showAddressTwoLink } onClick={ this.props.showAddress2Input }>
									{ i18n.translate( 'Add second line for address.' ) }
								</a>
							) }
						</fieldset>

						<fieldset>
							<label>{ i18n.translate( 'Country' ) }</label>
							<Country
								field={ fields.countryCode }
								className={ styles.countryCode }
								supportedBy="domains"
								dir="ltr"
							/>
							<ValidationError field={ fields.countryCode } />
						</fieldset>

						<fieldset>
							<label>{ i18n.translate( 'City' ) }</label>
							<Input
								disabled={ this.isDataLoading() }
								untouch={ untouch }
								field={ fields.city }
								className={ styles.city }
								placeholder={ i18n.translate( 'City' ) }
								dir="ltr"
							/>
							<ValidationError field={ fields.city } />
						</fieldset>

						<fieldset>
							<label>{ i18n.translate( 'State/Province' ) }</label>
							<State
								disabled={ this.isDataLoading() }
								field={ fields.state }
								untouch={ untouch }
								className={ styles.state }
								states={ this.props.states }
								dir="ltr"
							/>
							<ValidationError field={ fields.state } />
						</fieldset>

						<fieldset>
							<label>{ i18n.translate( 'Postal Code' ) }</label>
							<Input
								disabled={ this.isDataLoading() }
								untouch={ untouch }
								field={ fields.postalCode }
								className={ styles.postalCode }
								placeholder={ i18n.translate( 'Postal Code' ) }
								dir="ltr"
							/>
							<ValidationError field={ fields.postalCode } />
						</fieldset>

						<fieldset>
							<label>{ i18n.translate( 'Phone' ) }</label>
							<Phone
								countryCode={ fields.countryCode.value }
								disabled={ this.isDataLoading() }
								field={ fields.phone }
								untouch={ untouch }
								className={ styles.phone }
							/>
							<ValidationError field={ fields.phone } />
						</fieldset>

						{ this.props.preSubmitContent }
					</div>
				</Form.FieldArea>

				<Form.SubmitArea>
					<Button disabled={ this.isSubmitButtonDisabled() }>
						{ this.getSubmitButtonText() }
					</Button>
				</Form.SubmitArea>

				<Form.Footer>
					<p>
						{ this.props.footerContent }
					</p>
				</Form.Footer>
			</Form>
		);
	}
}

ContactInformationForm.propTypes = {
	asyncValidating: PropTypes.oneOfType( [
		PropTypes.bool,
		PropTypes.string,
	] ),
	contactInformation: PropTypes.object.isRequired,
	errors: PropTypes.object,
	fetchContactInformation: PropTypes.func.isRequired,
	fetchLocation: PropTypes.func.isRequired,
	fetchStates: PropTypes.func.isRequired,
	fields: PropTypes.object.isRequired,
	footerContent: PropTypes.node.isRequired,
	handleStartEditingFirstName: PropTypes.func.isRequired,
	handleStopEditingFirstName: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	initialEmail: PropTypes.string.isRequired,
	inputVisibility: PropTypes.object.isRequired,
	invalid: PropTypes.bool.isRequired,
	isUpdatingFirstName: PropTypes.bool.isRequired,
	onFormSubmit: PropTypes.func.isRequired,
	preSubmitContent: PropTypes.node.isRequired,
	resetInputVisibility: PropTypes.func.isRequired,
	showAddress2Input: PropTypes.func.isRequired,
	showOrganizationInput: PropTypes.func.isRequired,
	states: PropTypes.object.isRequired,
	submitButtonLabel: PropTypes.string.isRequired,
	submitButtonSubmittingLabel: PropTypes.string.isRequired,
	submitDisabled: PropTypes.bool,
	submitting: PropTypes.bool.isRequired,
	untouch: PropTypes.func.isRequired,
	userLocation: PropTypes.object.isRequired,
};

export default withStyles( styles )( bindHandlers( ContactInformationForm ) );
