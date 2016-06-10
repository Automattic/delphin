// External dependencies
import classNames from 'classnames';
import i18n from 'i18n-calypso';
import isEmpty from 'lodash/isEmpty';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import Form from 'components/ui/form';
import styles from './styles.scss';
import StepsProgressbar from 'components/ui/steps-progressbar';
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
		const steps = [
			i18n.translate( 'search' ),
			i18n.translate( 'sign in' ),
			i18n.translate( 'profile' ),
			i18n.translate( 'checkout' )
		];

		return (
			<div>
				<StepsProgressbar className={ styles.progress } steps={ steps } currentStep={ steps[ 2 ] } />

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
									className={ styles.firstName }
									placeholder={ i18n.translate( 'First Name' ) }
								/>
								<ValidationError field={ fields.firstName } />

								<input
									disabled={ this.isDataLoading() }
									{ ...fields.lastName }
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
									<input
										{ ...fields.organization }
										className={ styles.organization }
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
									className={ styles.addressOne }
									disabled={ this.isDataLoading() }
									placeholder={ i18n.translate( 'Address Line 1' ) }
								/>
								<ValidationError field={ fields.address1 } />

								{ ! this.address2InputIsVisible() && (
									<a className={ styles.showAddressTwoLink } onClick={ this.props.showAddress2Input }>
										{ i18n.translate( '+ Add Address Line 2' ) }
									</a>
								) }

								{ this.address2InputIsVisible() && (
									<input
										{ ...fields.address2 }
										className={ styles.addressTwo }
										disabled={ this.isDataLoading() }
										placeholder={ i18n.translate( 'Address Line 2' ) }
									/>
								) }

								<ValidationError field={ fields.address2 } />

								<div className={ styles.row }>
									<input
										disabled={ this.isDataLoading() }
										{ ...fields.city }
										className={ styles.city }
										placeholder={ i18n.translate( 'City' ) }
									/>
									<ValidationError field={ fields.city } />

									<input
										disabled={ this.isDataLoading() }
										{ ...fields.state }
										className={ styles.state }
										placeholder={ i18n.translate( 'State' ) }
									/>
									<ValidationError field={ fields.state } />

									<input
										disabled={ this.isDataLoading() }
										{ ...fields.postalCode }
										className={ styles.postalCode }
										placeholder={ i18n.translate( 'Zip' ) }
									/>
									<ValidationError field={ fields.postalCode } />
								</div>

								<select
									{ ...fields.countryCode }
									disabled={ this.isDataLoading() }
									className={ styles.countryCode }>
									<option>{ i18n.translate( 'Select Country' ) }</option>
									<option value=" " key="separator" disabled />
									{ countries.hasLoadedFromServer && countries.data.map( ( country, index ) => (
										country.name
										? <option value={ country.code } key={ country.code }>{ country.name }</option>
										: <option value=" " key={ index } disabled />
									) ) }
								</select>
								<ValidationError field={ fields.countryCode } />
							</fieldset>

							<fieldset>
								<label>{ i18n.translate( 'Phone' ) }</label>
								<input
									disabled={ this.isDataLoading() }
									{ ...fields.phone }
									className={ styles.phone }
									placeholder={ i18n.translate( 'Phone' ) }
								/>
								<ValidationError field={ fields.phone } />
							</fieldset>
						</div>
					}
					submitArea={
						<button disabled={ this.props.submitting }>
							{ i18n.translate( 'Continue to Checkout' ) }
						</button>
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
	submitting: PropTypes.bool.isRequired,
	user: PropTypes.object.isRequired,
	validateContactInformation: PropTypes.func.isRequired
};

export default withStyles( styles )( ContactInformation );
