// External dependencies
import classNames from 'classnames';
import i18n from 'i18n-calypso';
import isEmpty from 'lodash/isEmpty';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import Form from 'components/ui/form';
import State from 'components/ui/contact-information/state';
import styles from './styles.scss';
import CheckoutProgressbar from 'components/ui/checkout-progressbar';
import ValidationError from 'components/ui/form/validation-error';

class ContactInformation extends React.Component {
	constructor( props ) {
		super( props );

		this.validateContactInformationBound = this.validateContactInformation.bind( this );
	}

	componentWillMount() {
		if ( ! this.props.domain ) {
			this.props.redirectToHome();
		}

		this.redirectIfLoggedOut();

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

		if ( ! this.props.countries.isRequesting && ! this.props.countries.hasLoadedFromServer ) {
			this.props.fetchCountries();
		}
	}

	componentWillReceiveProps( nextProps ) {
		this.redirectIfLoggedOut( nextProps );

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
			return Object.assign( result, { [ fieldName ]: props.contactInformation.data[ fieldName ] || '' } );
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
		return ! props.contactInformation.hasLoadedFromServer ||
			! props.countries.hasLoadedFromServer;
	}

	redirectIfLoggedOut( props = this.props ) {
		if ( props.isLoggedOut ) {
			props.redirectToHome();
		}
	}

	address2InputIsVisible() {
		const { inputVisibility: { address2InputIsVisible }, fields: { address2 } } = this.props;

		return address2InputIsVisible || address2.initialValue;
	}

	organizationInputIsVisible() {
		const { inputVisibility: { organizationInputIsVisible }, fields: { organization } } = this.props;

		return organizationInputIsVisible || organization.initialValue;
	}

	validateContactInformation() {
		const contactInformation = Object.keys( this.props.fields ).reduce( ( result, fieldName ) => {
			return Object.assign( result, { [ fieldName ]: this.props.fields[ fieldName ].value } );
		}, {} );

		return this.props.validateContactInformation(
			this.props.domain,
			contactInformation
		).then( () => {
			if ( isEmpty( this.props.errors ) ) {
				this.props.redirectToCheckout();
			}
		} );
	}

	render() {
		const { fields, handleSubmit, countries } = this.props;

		return (
			<div>
				<CheckoutProgressbar currentStep={ 2 } />

				<div className={ styles.header }>
					<h2 className={ styles.heading }>
						{ i18n.translate( 'Registration Profile' ) }
					</h2>

					<h3 className={ styles.text }>
						{ i18n.translate( 'We need your contact information to claim your new domain.' ) }
					</h3>
				</div>

				<Form
					onSubmit={ handleSubmit( this.validateContactInformationBound ) }
					fieldArea={
						<div>
							<fieldset className={ styles.row }>
								<label>{ i18n.translate( 'Name' ) }</label>

								<input
									disabled={ this.isDataLoading() }
									{ ...fields.firstName }
									autoFocus
									className={ classNames( styles.firstName, { [ styles.hasError ]: fields.firstName.error } ) }
									placeholder={ i18n.translate( 'First Name' ) }
								/>

								<input
									disabled={ this.isDataLoading() }
									{ ...fields.lastName }
									className={ classNames( styles.lastName, { [ styles.hasError ]: fields.lastName.error } ) }
									placeholder={ i18n.translate( 'Last Name' ) }
								/>
								<ValidationError fields={ [ fields.firstName, fields.lastName ] } />
							</fieldset>

							{ ! this.organizationInputIsVisible() && (
								<a className={ styles.showOrganizationLink } onClick={ this.props.showOrganizationInput }>
									{ i18n.translate( 'Registering for a company? Add Organization name' ) }
								</a>
							) }

							{ this.organizationInputIsVisible() && (
								<fieldset>
									<label>{ i18n.translate( 'Organization' ) }</label>
									<input
										{ ...fields.organization }
										className={ classNames( styles.organization, { [ styles.hasError ]: fields.organization.error } ) }
										disabled={ this.isDataLoading() }
										placeholder={ i18n.translate( 'Organization' ) }
									/>
									<ValidationError field={ fields.organization } />
								</fieldset>
							) }

							<fieldset className={ classNames( { [ styles.addressTwoIsVisible ]: this.address2InputIsVisible() } ) }>
								<label>{ i18n.translate( 'Address' ) }</label>

								<input
									{ ...fields.address1 }
									className={ classNames( styles.addressOne, { [ styles.hasError ]: fields.address1.error } ) }
									disabled={ this.isDataLoading() }
									placeholder={ i18n.translate( 'Address Line 1' ) }
								/>

								{ this.address2InputIsVisible() && (
									<input
										{ ...fields.address2 }
										className={ classNames( styles.addressTwo, { [ styles.hasError ]: fields.address2.error } ) }
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

								<div className={ styles.row }>
									<input
										disabled={ this.isDataLoading() }
										{ ...fields.city }
										className={ classNames( styles.city, { [ styles.hasError ]: fields.city.error } ) }
										placeholder={ i18n.translate( 'City' ) }
									/>

									<State
										disabled={ this.isDataLoading() }
										field={ fields.state }
										className={ classNames( styles.state, { [ styles.hasError ]: fields.state.error } ) }
										states={ this.props.states } />

									<input
										disabled={ this.isDataLoading() }
										{ ...fields.postalCode }
										className={ classNames( styles.postalCode, { [ styles.hasError ]: fields.postalCode.error } ) }
										placeholder={ i18n.translate( 'Zip' ) }
									/>
									<ValidationError
										fields={ [
											fields.city,
											fields.state,
											fields.postalCode
										] }
									/>
								</div>

								<select
									{ ...fields.countryCode }
									disabled={ this.isDataLoading() }
									className={ styles.countryCode }>
									<option value="" disabled>{ i18n.translate( 'Select Country' ) }</option>
									<option disabled />
									{ countries.hasLoadedFromServer && countries.data.map( ( country, index ) => (
										country.name
										? <option value={ country.code } key={ country.code }>{ country.name }</option>
										: <option value=" " key={ index } disabled />
									) ) }
								</select>
							</fieldset>

							<fieldset>
								<label>{ i18n.translate( 'Phone' ) }</label>
								<input
									disabled={ this.isDataLoading() }
									{ ...fields.phone }
									className={ classNames( styles.phone, { [ styles.hasError ]: fields.phone.error } ) }
									placeholder={ i18n.translate( 'Phone' ) }
								/>
								<ValidationError field={ fields.phone } />
							</fieldset>
						</div>
					}
					submitArea={
						<div>
							<p className={ styles.disclaimer }>
								{ i18n.translate( 'Some providers charge a fee to keep this information private, but we protect your privacy free of charge.' ) }
							</p>

							<button disabled={ this.props.submitting }>
								{ i18n.translate( 'Continue to Checkout' ) }
							</button>
						</div>
					} />
			</div>
		);
	}
}

ContactInformation.propTypes = {
	contactInformation: PropTypes.object.isRequired,
	countries: PropTypes.object.isRequired,
	domain: PropTypes.string,
	fetchCountries: PropTypes.func.isRequired,
	fetchLocation: PropTypes.func.isRequired,
	fields: PropTypes.object.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	inputVisibility: PropTypes.object.isRequired,
	isLoggedIn: PropTypes.bool.isRequired,
	isLoggedOut: PropTypes.bool.isRequired,
	location: PropTypes.object.isRequired,
	redirectToCheckout: PropTypes.func.isRequired,
	redirectToHome: PropTypes.func.isRequired,
	resetInputVisibility: PropTypes.func.isRequired,
	showAddress2Input: PropTypes.func.isRequired,
	showOrganizationInput: PropTypes.func.isRequired,
	states: PropTypes.object.isRequired,
	submitting: PropTypes.bool.isRequired,
	user: PropTypes.object.isRequired,
	validateContactInformation: PropTypes.func.isRequired
};

export default withStyles( styles )( ContactInformation );
