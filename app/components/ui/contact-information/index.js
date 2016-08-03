// External dependencies
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import i18n from 'i18n-calypso';
import isEmpty from 'lodash/isEmpty';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { bindHandlers } from 'react-bind-handlers';

// Internal dependencies
import Button from 'components/ui/button';
import Country from 'components/containers/country';
import DocumentTitle from 'components/ui/document-title';
import Form from 'components/ui/form';
import Phone from 'components/ui/form/phone';
import State from 'components/ui/form/state';
import Input from 'components/ui/form/input';
import styles from './styles.scss';
import CheckoutProgressbar from 'components/ui/checkout-progressbar';
import ValidationError from 'components/ui/form/validation-error';
import withPageView from 'lib/analytics/with-page-view';

class ContactInformation extends React.Component {
	constructor( props ) {
		super( props );

		this.debouncedValidateBound = debounce( this.validate.bind( this ), 500 );
	}

	componentWillMount() {
		if ( this.props.isLoggedOut ) {
			this.props.redirectToLogin();
			return;
		}

		if ( ! this.props.hasSelectedDomain ) {
			this.props.redirectToHome();
			return;
		}

		if ( ! this.props.location.isRequesting && ! this.props.location.hasLoadedFromServer ) {
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
		if ( nextProps.isLoggedOut ) {
			this.props.redirectToLogin();
			return;
		}

		if ( this.isDataLoading() && ! this.isDataLoading( nextProps ) ) {
			this.initializeContactInformation( nextProps );
		}

		if ( ! this.canUpdateCountryFromLocation() && this.canUpdateCountryFromLocation( nextProps ) ) {
			this.setCountryCode( nextProps );
		}

		if ( this.props.fields.countryCode.value !== nextProps.fields.countryCode.value ) {
			this.props.fetchStates( nextProps.fields.countryCode.value );

			// Resets the state field every time the user selects a different country
			this.props.fields.state.onChange( '' );
		}
	}

	initializeContactInformation( props = this.props ) {
		const form = Object.keys( props.fields ).reduce( ( result, fieldName ) => {
			const value = props.fields[ fieldName ].value || props.contactInformation.data[ fieldName ] || '';

			return Object.assign( result, { [ fieldName ]: value } );
		}, {} );

		props.initializeForm( form );
	}

	setCountryCode( props = this.props ) {
		let countryCode;

		// Use the GEO location
		if ( props.location.hasLoadedFromServer ) {
			countryCode = props.location.data.countryCode;
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
			( props.location.hasLoadedFromServer || props.location.hasFailedToLoad );
	}

	isDataLoading( props = this.props ) {
		return ! props.contactInformation.hasLoadedFromServer;
	}

	isSubmitButtonDisabled() {
		const { invalid, submitting } = this.props;

		return invalid || submitting || this.isDataLoading();
	}

	address2InputIsVisible() {
		const { inputVisibility: { address2InputIsVisible }, fields: { address2 } } = this.props;

		return address2InputIsVisible || address2.initialValue;
	}

	emailInputIsVisible() {
		const { fields: { email } } = this.props;

		return email.initialValue && email.initialValue.includes( '+' );
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
			if ( isEmpty( this.props.errors ) ) {
				this.props.redirectToCheckout();
			}
		} );
	}

	handleBlur( event ) {
		this.debouncedValidateBound();

		this.props.fields[ event.target.name ].onBlur();
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
							{ i18n.translate( 'Your details are needed to claim {{strong}}%(domain)s{{/strong}}.',
								{
									args: { domain: this.props.domain.domainName },
									components: { strong: <strong /> }
								}
							) }
						</h3>
					</div>

					<Form
						onSubmit={ handleSubmit( this.handleSubmission ) }
						fieldArea={
							<div>
								<fieldset>
									<label>{ i18n.translate( 'First Name' ) }</label>
									<Input
											disabled={ this.isDataLoading() }
											field={ fields.firstName }
											autoFocus
											untouch={ untouch }
											onBlur={ this.handleBlur }
											className={ styles.firstName }
											placeholder={ i18n.translate( 'First Name' ) }
										/>
									<ValidationError field={ fields.firstName } />
								</fieldset>

								<fieldset>
									<label>{ i18n.translate( 'Last Name' ) }</label>
									<Input
										disabled={ this.isDataLoading() }
										field={ fields.lastName }
										untouch={ untouch }
										onBlur={ this.handleBlur }
										className={ styles.lastName }
										placeholder={ i18n.translate( 'Last Name' ) }
									/>
									<ValidationError field={ fields.lastName } />
								</fieldset>

								{ ! this.organizationInputIsVisible() && (
									<a className={ styles.showOrganizationLink } onClick={ this.props.showOrganizationInput }>
										{ i18n.translate( 'Registering for a company? Add Organization name' ) }
									</a>
								) }

								{ this.organizationInputIsVisible() && (
									<fieldset>
										<label>{ i18n.translate( 'Organization' ) }</label>
										<Input
											field={ fields.organization }
											untouch={ untouch }
											onBlur={ this.handleBlur }
											className={ styles.organization }
											disabled={ this.isDataLoading() }
											placeholder={ i18n.translate( 'Organization' ) }
										/>
										<ValidationError field={ fields.organization } />
									</fieldset>
								) }

								{ this.emailInputIsVisible() && (
									<fieldset>
										<label>{ i18n.translate( 'Email' ) }</label>
										<Input
											disabled={ this.isDataLoading() }
											field={ fields.email }
											onBlur={ this.handleBlur }
											placeholder={ i18n.translate( 'Email' ) }
											untouch={ untouch }
										/>
										<ValidationError field={ fields.email } />
									</fieldset>
								) }

								<fieldset className={ classNames( { [ styles.addressTwoIsVisible ]: this.address2InputIsVisible() } ) }>
									<label>{ i18n.translate( 'Address' ) }</label>

									<Input
										field={ fields.address1 }
										untouch={ untouch }
										onBlur={ this.handleBlur }
										className={ styles.address1 }
										disabled={ this.isDataLoading() }
										placeholder={ i18n.translate( 'Address Line 1' ) }
									/>

									{ this.address2InputIsVisible() && (
										<Input
											field={ fields.address2 }
											untouch={ untouch }
											onBlur={ this.handleBlur }
											className={ styles.address2 }
											disabled={ this.isDataLoading() }
											placeholder={ i18n.translate( 'Address Line 2' ) }
										/>
									) }

									<ValidationError fields={ [ fields.address1, fields.address2 ] } />

									{ ! this.address2InputIsVisible() && (
										<a className={ styles.showAddressTwoLink } onClick={ this.props.showAddress2Input }>
											{ i18n.translate( '+ Add Address Line 2' ) }
										</a>
									) }
								</fieldset>

								<fieldset>
									<label>{ i18n.translate( 'Country' ) }</label>
									<Country
										field={ fields.countryCode }
										className={ styles.countryCode }
										supportedBy="domains"
									/>
									<ValidationError field={ fields.countryCode } />
								</fieldset>

								<fieldset>
									<label>{ i18n.translate( 'City' ) }</label>
									<Input
										disabled={ this.isDataLoading() }
										untouch={ untouch }
										field={ fields.city }
										onBlur={ this.handleBlur }
										className={ styles.city }
										placeholder={ i18n.translate( 'City' ) }
									/>
									<ValidationError field={ fields.city } />
								</fieldset>

								<fieldset>
									<div className={ styles.row }>
										<div className={ styles.state }>
											<label>{ i18n.translate( 'State/Province' ) }</label>
											<State
												disabled={ this.isDataLoading() }
												field={ fields.state }
												untouch={ untouch }
												onBlur={ this.handleBlur }
												className={ styles.state }
												states={ this.props.states } />
										</div>

										<div className={ styles.zip }>
											<label>{ i18n.translate( 'Postal Code' ) }</label>
											<Input
												disabled={ this.isDataLoading() }
												untouch={ untouch }
												field={ fields.postalCode }
												onBlur={ this.handleBlur }
												className={ styles.postalCode }
												placeholder={ i18n.translate( 'Postal Code' ) }
											/>
										</div>
									</div>
									<ValidationError
										fields={ [
											fields.state,
											fields.postalCode
										] }
									/>
								</fieldset>

								<fieldset>
									<label>{ i18n.translate( 'Phone' ) }</label>
									<Phone
										countryCode={ fields.countryCode.value }
										disabled={ this.isDataLoading() }
										field={ fields.phone }
										untouch={ untouch }
										onBlur={ this.handleBlur }
										className={ styles.phone }
									/>
									<ValidationError field={ fields.phone } />
								</fieldset>
							</div>
						}
						submitArea={
							<div>
								<Button disabled={ this.isSubmitButtonDisabled() }>
									{ i18n.translate( 'Continue to Checkout' ) }
								</Button>
							</div>
						} />
				</div>
			</DocumentTitle>
		);
	}
}

ContactInformation.propTypes = {
	contactInformation: PropTypes.object.isRequired,
	domain: PropTypes.object,
	errors: PropTypes.object,
	fetchContactInformation: PropTypes.func.isRequired,
	fetchLocation: PropTypes.func.isRequired,
	fetchStates: PropTypes.func.isRequired,
	fields: PropTypes.object.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	hasSelectedDomain: PropTypes.bool.isRequired,
	inputVisibility: PropTypes.object.isRequired,
	invalid: PropTypes.bool.isRequired,
	isLoggedIn: PropTypes.bool.isRequired,
	isLoggedOut: PropTypes.bool.isRequired,
	location: PropTypes.object.isRequired,
	redirectToCheckout: PropTypes.func.isRequired,
	redirectToHome: PropTypes.func.isRequired,
	redirectToLogin: PropTypes.func.isRequired,
	resetInputVisibility: PropTypes.func.isRequired,
	showAddress2Input: PropTypes.func.isRequired,
	showOrganizationInput: PropTypes.func.isRequired,
	states: PropTypes.object.isRequired,
	submitting: PropTypes.bool.isRequired,
	untouch: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	validateContactInformation: PropTypes.func.isRequired
};

export default withStyles( styles )( withPageView( bindHandlers( ContactInformation ), 'Contact Information' ) );
