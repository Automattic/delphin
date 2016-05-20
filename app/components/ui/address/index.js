// External dependencies
import i18n from 'i18n-calypso';
import React from 'react';

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
			<div>
				{ i18n.translate( 'Address' ) }
				<fieldset>
					<label>{ i18n.translate( 'Name' ) }</label>
					<input { ...fields.name } />
				</fieldset>

				<fieldset>
					<label>{ i18n.translate( 'Address Line 1' ) }</label>
					<input { ...fields.addressLine1 } />
				</fieldset>

				<fieldset>
					<label>{ i18n.translate( 'Address Line 2' ) }</label>
					<input { ...fields.addressLine2 } />
				</fieldset>

				<fieldset>
					<label>{ i18n.translate( 'City' ) }</label>
					<input { ...fields.city } />
				</fieldset>

				<fieldset>
					<label>{ i18n.translate( 'State' ) }</label>
					<input { ...fields.state } />
				</fieldset>

				<fieldset>
					<label>{ i18n.translate( 'Country' ) }</label>
					<input { ...fields.country } />
				</fieldset>

				<fieldset>
					<label>{ i18n.translate( 'Phone' ) }</label>
					<input { ...fields.phone } />
				</fieldset>
			</div>
		);
	}
}

export default Address;
