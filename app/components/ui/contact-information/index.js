// External dependencies
import find from 'lodash/find';
import i18n from 'i18n-calypso';
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';
import StepsProgressbar from 'components/ui/steps-progressbar';

class ContactInformation extends React.Component {
	constructor( props ) {
		super( props );
	}

	componentWillMount() {
		if ( ! this.props.countries.isRequesting && ! this.props.countries.hasLoadedFromServer ) {
			this.props.fetchCountries();
		}
		this.redirectIfLoggedOut();
	}

	componentWillReceiveProps( nextProps ) {
		this.redirectIfLoggedOut( nextProps );

		const { countries } = nextProps;
		if ( ! this.props.countries.hasLoadedFromServer && nextProps.countries.hasLoadedFromServer ) {
			const currentCountry = find( countries.data, { your_country: true } );

			if ( currentCountry ) {
				nextProps.fields.country.onChange( currentCountry.code );
			}
		}
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
							{ ...fields.name }
							className={ styles.name }
							placeholder={ i18n.translate( 'Name' ) }
						/>
					</fieldset>

					<fieldset className={ styles.fieldset }>
						<label className={ styles.label }>{ i18n.translate( 'Organization' ) }</label>
						<input
							{ ...fields.organization }
							className={ styles.organization }
							placeholder={ i18n.translate( 'Organization' ) }
						/>
					</fieldset>

					<fieldset className={ styles.fieldset }>
						<label className={ styles.label }>{ i18n.translate( 'Address' ) }</label>
						<input
							{ ...fields.addressLine1 }
							className={ styles.addressLineOne }
							placeholder={ i18n.translate( 'Address Line 1' ) }
						/>
						<input
							{ ...fields.addressLine2 }
							className={ styles.addressLineTwo }
							placeholder={ i18n.translate( 'Address Line 2' ) }
						/>
						<div className={ styles.row }>
							<input
								{ ...fields.city }
								className={ styles.city }
								placeholder={ i18n.translate( 'City' ) }
							/>
							<input
								{ ...fields.state }
								className={ styles.state }
								placeholder={ i18n.translate( 'State' ) }
							/>
							<input
								{ ...fields.zip }
								className={ styles.zip }
								placeholder={ i18n.translate( 'Zip' ) }
							/>
						</div>
						<select
							{ ...fields.country }
							disabled={ ! countries.hasLoadedFromServer }
							className={ styles.country }>
							<option>
								{
									countries.hasLoadedFromServer
									? i18n.translate( 'Select Country' )
									: i18n.translate( 'Loading…' )
								}
							</option>
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
							{ ...fields.fax }
							className={ styles.fax }
							placeholder={ i18n.translate( 'Fax' ) }
						/>
					</fieldset>

					<fieldset className={ styles.fieldset }>
						<label className={ styles.label }>{ i18n.translate( 'Phone' ) }</label>
						<input
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

export default withStyles( styles )( ContactInformation );
