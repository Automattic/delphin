// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';
import StepsProgressbar from 'components/ui/steps-progressbar';

class ContactInformation extends React.Component {
	constructor( props ) {
		super( props );
	}

	componentWillMount() {
		if ( ! this.props.contactInformation.isRequesting && ! this.props.contactInformation.hasLoadedFromServer ) {
			this.props.fetchContactInformation();
		}

		if ( this.props.contactInformation.hasLoadedFromServer ) {
			this.initializeContactInformation();
		}

		this.props.resetInputVisibility();

		if ( ! this.props.countries.isRequesting && ! this.props.countries.hasLoadedFromServer ) {
			this.props.fetchCountries();
		}

		this.redirectIfLoggedOut();
	}

	componentWillReceiveProps( nextProps ) {
		this.redirectIfLoggedOut( nextProps );

		if ( ! this.props.contactInformation.hasLoadedFromServer && nextProps.contactInformation.hasLoadedFromServer ) {
			this.initializeContactInformation( nextProps );
		}
	}

	getName( props ) {
		const { firstName, lastName } = props.contactInformation.data;

		return [ firstName, lastName ].filter( name => name ).join( ' ' );
	}

	initializeContactInformation( props = this.props ) {
		const form = Object.keys( props.fields ).reduce( ( result, fieldName ) => {
			if ( fieldName === 'name' ) {
				// combine the first and last name into a single `name` field
				return Object.assign( result, {
					name: this.getName( props )
				} );
			}

			return Object.assign( result, { [ fieldName ]: props.contactInformation.data[ fieldName ] || '' } );
		}, {} );

		props.initializeForm( form );
	}

	isDataLoading() {
		return ! this.props.contactInformation.hasLoadedFromServer || ! this.props.countries.hasLoadedFromServer;
	}

	redirectIfLoggedOut( props = this.props ) {
		if ( props.isLoggedOut ) {
			props.redirectToHome();
		}
	}

	render() {
		const { fields, countries } = this.props;
		const steps = [
			i18n.translate( 'search' ),
			i18n.translate( 'sign in' ),
			i18n.translate( 'profile' ),
			i18n.translate( 'checkout' )
		];

		return (
			<div className={ styles.address }>
				<StepsProgressbar className={ styles.progress } steps={ steps } currentStep={ steps[ 2 ] } />

				<h2 className={ styles.header }>{ i18n.translate( 'Registration Profile' ) }</h2>
				<h3 className={ styles.subHeader }>{ i18n.translate( 'We need your contact information to claim your new domain.' ) }</h3>
				<form className={ styles.form }>
					<fieldset className={ styles.fieldset }>
						<label className={ styles.label }>{ i18n.translate( 'Name' ) }</label>
						<input
							disabled={ this.isDataLoading() }
							{ ...fields.name }
							autoFocus
							className={ styles.name }
							placeholder={ i18n.translate( 'Name' ) }
						/>
					</fieldset>

					{ ! this.props.inputVisibility.organizationInputIsVisible && (
						<a className={ styles.showOrganizationLink } onClick={ this.props.showOrganizationInput }>
							{ i18n.translate( 'Registering for a company? Add Organization name' ) }
						</a>
					) }

					{ this.props.inputVisibility.organizationInputIsVisible && (
						<fieldset className={ styles.fieldset }>
							<label className={ styles.label }>{ i18n.translate( 'Organization' ) }</label>
							<input
								{ ...fields.organization }
								className={ styles.organization }
								disabled={ this.isDataLoading() }
								placeholder={ i18n.translate( 'Organization' ) }
							/>
						</fieldset>
					) }

					<fieldset className={ styles.fieldset }>
						<label className={ styles.label }>{ i18n.translate( 'Address' ) }</label>
						<input
							disabled={ this.isDataLoading() }
							{ ...fields.address1 }
							className={ styles.addressOne }
							placeholder={ i18n.translate( 'Address Line 1' ) }
						/>

						{ ! this.props.inputVisibility.address2InputIsVisible && (
							<a className={ styles.showAddressTwoLink } onClick={ this.props.showAddress2Input }>
								{ i18n.translate( '+ Add Address Line 2' ) }
							</a>
						) }

						{ this.props.inputVisibility.address2InputIsVisible && (
							<input
								{ ...fields.addressLine2 }
								className={ styles.addressLineTwo }
								disabled={ this.isDataLoading() }
								placeholder={ i18n.translate( 'Address Line 2' ) }
							/>
						) }

						<div className={ styles.row }>
							<input
								disabled={ this.isDataLoading() }
								{ ...fields.city }
								className={ styles.city }
								placeholder={ i18n.translate( 'City' ) }
							/>
							<input
								disabled={ this.isDataLoading() }
								{ ...fields.state }
								className={ styles.state }
								placeholder={ i18n.translate( 'State' ) }
							/>
							<input
								disabled={ this.isDataLoading() }
								{ ...fields.postalCode }
								className={ styles.postalCode }
								placeholder={ i18n.translate( 'Zip' ) }
							/>
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
					</fieldset>

					<fieldset className={ styles.fieldset }>
						<label className={ styles.label }>{ i18n.translate( 'Fax' ) }</label>
						<input
							disabled={ this.isDataLoading() }
							{ ...fields.fax }
							className={ styles.fax }
							placeholder={ i18n.translate( 'Fax' ) }
						/>
					</fieldset>

					<fieldset className={ styles.fieldset }>
						<label className={ styles.label }>{ i18n.translate( 'Phone' ) }</label>
						<input
							disabled={ this.isDataLoading() }
							{ ...fields.phone }
							className={ styles.phone }
							placeholder={ i18n.translate( 'Phone' ) }
						/>
					</fieldset>
				</form>
			</div>
		);
	}
}

ContactInformation.propTypes = {
	contactInformation: PropTypes.object.isRequired,
	countries: PropTypes.object.isRequired,
	fetchCountries: PropTypes.func.isRequired,
	fields: PropTypes.object.isRequired,
	inputVisibility: PropTypes.object.isRequired,
	isLoggedIn: PropTypes.bool.isRequired,
	isLoggedOut: PropTypes.bool.isRequired,
	redirectToHome: PropTypes.func.isRequired,
	resetInputVisibility: PropTypes.func.isRequired,
	showAddress2Input: PropTypes.func.isRequired,
	showOrganizationInput: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired
};

export default withStyles( styles )( ContactInformation );
