// External dependencies
import i18n from 'i18n-calypso';
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

class Address extends React.Component {
	constructor( props ) {
		super( props );
	}

	componentWillMount() {
		this.redirectIfLoggedOut();
	}

	componentWillReceiveProps( nextProps ) {
		this.redirectIfLoggedOut( nextProps );
	}

	redirectIfLoggedOut( props = this.props ) {
		if ( props.isLoggedOut ) {
			props.redirectToHome();
		}
	}

	render() {
		const { fields } = this.props;

		return (
			<div className={ styles.address }>
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
							{ ...fields.name }
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
							className={ styles.country }>
							<option>{ i18n.translate( 'Country' ) }</option>
						</select>
					</fieldset>

					<fieldset className={ styles.fieldset }>
						<label className={ styles.label }>{ i18n.translate( 'Fax' ) }</label>
						<input
							{ ...fields.phone }
							className={ styles.fax }
							placeholder={ i18n.translate( 'Fax' ) }
						/>
					</fieldset>

					<fieldset className={ styles.fieldset }>
						<label className={ styles.label }>{ i18n.translate( 'Phone' ) }</label>
						<input
							{ ...fields.phone }
							className={ styles.phone }
							placeholder={ i18n.translate( 'Phone' ) }k
						/>
					</fieldset>
				</form>
			</div>
		);
	}
}

export default withStyles( styles )( Address );
