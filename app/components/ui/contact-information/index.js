// External dependencies
import i18n from 'i18n-calypso';
import isEmpty from 'lodash/isEmpty';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { bindHandlers } from 'react-bind-handlers';

// Internal dependencies
import Button from 'components/ui/button';
import CheckoutProgressbar from 'components/ui/checkout-progressbar';
import Country from 'components/containers/country';
import DocumentTitle from 'components/ui/document-title';
import Form from 'components/ui/form';
import Input from 'components/ui/form/input';
import { isCallingCode } from 'lib/form';
import Phone from 'components/ui/form/phone';
import State from 'components/ui/form/state';
import styles from './styles.scss';
import ValidationError from 'components/ui/form/validation-error';
import withPageView from 'lib/analytics/with-page-view';

class ContactInformation extends React.Component {
	componentWillMount() {
		if ( ! this.props.hasSelectedDomain ) {
			this.props.redirectToHome();
			return;
		}

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
				value = props.user.data.email;
			}

			return Object.assign( result, { [ fieldName ]: value } );
		}, {} );

		props.initializeForm( form );
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
		const { asyncValidating, invalid, submitting } = this.props;

		return asyncValidating || invalid || submitting || this.isDataLoading();
	}

	address2InputIsVisible() {
		const { inputVisibility: { address2InputIsVisible }, fields: { address2 } } = this.props;

		return address2InputIsVisible || address2.initialValue;
	}

	organizationInputIsVisible() {
		const { inputVisibility: { organizationInputIsVisible }, fields: { organization } } = this.props;

		return organizationInputIsVisible || organization.initialValue;
	}

	validate() {
		const contactInformation = Object.keys( this.props.fields ).reduce( ( result, fieldName ) => {
			return Object.assign( result, { [ fieldName ]: this.props.fields[ fieldName ].value } );
		}, {} );

		return this.props.validateContactInformation(
			this.props.domain.domainName,
			contactInformation
		);
	}

	handleSubmission() {
		this.validate().then( () => {
			const { errors } = this.props;

			if ( isEmpty( errors ) ) {
				this.props.redirectToCheckout();
			}
		} );
	}

	getSubmitButtonText() {
		const { asyncValidating, submitting } = this.props;

		if ( asyncValidating ) {
			return i18n.translate( 'Checking your details…' );
		}

		if ( submitting ) {
			return i18n.translate( 'Taking you to checkout…' );
		}

		return i18n.translate( 'Continue to checkout' );
	}

	getPrivacyNoticeText() {
		const { hasTrademarkClaim } = this.props;

		if ( hasTrademarkClaim ) {
			return i18n.translate( 'Your contact information will be available in a public database of domain owners, called "Whois".' );
		}

		return i18n.translate( "Domain owners are required to share contact information publicly. We keep your personal information out of your domain's public records, to protect your identity and prevent spam." );
	}

	render() {
		const { fields, handleSubmit, untouch } = this.props;

		return (
			<DocumentTitle title={ i18n.translate( 'Contact Information' ) }>
				<div>
					<div className={ styles.header }>
						<CheckoutProgressbar currentStep={ 2 } />

						<h2 className={ styles.heading }>
							{ i18n.translate( 'Enter your contact information' ) }
						</h2>

						<h3 className={ styles.text }>
							{ i18n.translate( 'Your details are needed to register {{strong}}%(domain)s{{/strong}}.',
								{
									args: { domain: this.props.domain.domainName },
									components: { strong: <strong /> }
								}
							) }
						</h3>
					</div>

					<Form
						onSubmit={ handleSubmit( this.handleSubmission ) }
						errors={ this.props.errors }
						focusOnError
					>
						<Form.FieldArea>
							<div>
								<fieldset>
									<label>{ i18n.translate( 'First Name' ) }</label>
									<Input
										disabled={ this.isDataLoading() }
										field={ fields.firstName }
										autoFocus
										untouch={ untouch }
										className={ styles.firstName }
										placeholder={ i18n.translate( 'First Name' ) }
										dir="ltr"
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
							</div>
						</Form.FieldArea>

						<Form.SubmitArea>
							<Button disabled={ this.isSubmitButtonDisabled() }>
								{ this.getSubmitButtonText() }
							</Button>
						</Form.SubmitArea>

						<Form.Footer>
							<p>
								{ this.getPrivacyNoticeText() }
							</p>
						</Form.Footer>
					</Form>
				</div>
			</DocumentTitle>
		);
	}
}

ContactInformation.propTypes = {
	asyncValidating: PropTypes.oneOfType( [
		PropTypes.bool,
		PropTypes.string,
	] ),
	contactInformation: PropTypes.object.isRequired,
	domain: PropTypes.object,
	errors: PropTypes.object,
	fetchContactInformation: PropTypes.func.isRequired,
	fetchLocation: PropTypes.func.isRequired,
	fetchStates: PropTypes.func.isRequired,
	fields: PropTypes.object.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	hasSelectedDomain: PropTypes.bool.isRequired,
	hasTrademarkClaim: PropTypes.bool.isRequired,
	inputVisibility: PropTypes.object.isRequired,
	invalid: PropTypes.bool.isRequired,
	redirectToCheckout: PropTypes.func.isRequired,
	redirectToHome: PropTypes.func.isRequired,
	resetInputVisibility: PropTypes.func.isRequired,
	showAddress2Input: PropTypes.func.isRequired,
	showOrganizationInput: PropTypes.func.isRequired,
	states: PropTypes.object.isRequired,
	submitting: PropTypes.bool.isRequired,
	untouch: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	userLocation: PropTypes.object.isRequired,
	validateContactInformation: PropTypes.func.isRequired
};

export default withStyles( styles )( withPageView( bindHandlers( ContactInformation ), 'Contact Information' ) );
