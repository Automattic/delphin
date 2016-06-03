// External dependencies
import i18n from 'i18n-calypso';
import isEmpty from 'lodash/isEmpty';
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

		if ( ! this.props.countries.isRequesting && ! this.props.countries.hasLoadedFromServer ) {
			this.props.fetchCountries();
		}

		this.redirectIfLoggedOut();

		if ( this.props.user.isLoggedIn ) {
			this.changeNameToMatchUserData();
		}
	}

	componentWillReceiveProps( nextProps ) {
		if ( ! this.props.contactInformation.hasLoadedFromServer && nextProps.contactInformation.hasLoadedFromServer ) {
			this.initializeContactInformation( nextProps );
		}

		this.redirectIfLoggedOut( nextProps );

		if ( ! this.props.user.isLoggedIn && nextProps.user.isLoggedIn ) {
			this.changeNameToMatchUserData( nextProps );
		}
	}

	initializeContactInformation( props = this.props ) {
		const form = Object.keys( props.fields ).reduce( ( result, field ) => {
			if ( field === 'name' ) {
				// combine the first and last name into a single `name` field
				return Object.assign( result, {
					name: props.contactInformation.data.firstName + ' ' + props.contactInformation.data.lastName
				} );
			}

			return Object.assign( result, { [ field ]: props.contactInformation.data[ field ] || '' } );
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

	changeNameToMatchUserData( props = this.props ) {
		if ( props.fields.name.dirty ) {
			// only update if the user hasn't started editing the name
			return;
		}

		const { user: { data: { firstName, lastName } } } = props,
			names = [];

		if ( firstName ) {
			names.push( firstName );
		}

		if ( lastName ) {
			names.push( lastName );
		}

		if ( ! isEmpty( names ) ) {
			props.fields.name.onChange( names.join( ' ' ) );
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

					<fieldset className={ styles.fieldset }>
						<label className={ styles.label }>{ i18n.translate( 'Organization' ) }</label>
						<input
							disabled={ this.isDataLoading() }
							{ ...fields.organization }
							className={ styles.organization }
							placeholder={ i18n.translate( 'Organization' ) }
						/>
					</fieldset>

					<fieldset className={ styles.fieldset }>
						<label className={ styles.label }>{ i18n.translate( 'Address' ) }</label>
						<input
							disabled={ this.isDataLoading() }
							{ ...fields.address1 }
							className={ styles.addressOne }
							placeholder={ i18n.translate( 'Address Line 1' ) }
						/>
						<input
							disabled={ this.isDataLoading() }
							{ ...fields.address2 }
							className={ styles.addressTwo }
							placeholder={ i18n.translate( 'Address Line 2' ) }
						/>
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
	countries: PropTypes.object.isRequired,
	fetchCountries: PropTypes.func.isRequired,
	fields: PropTypes.object.isRequired,
	isLoggedOut: PropTypes.bool.isRequired,
	redirectToHome: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired
};

export default withStyles( styles )( ContactInformation );
