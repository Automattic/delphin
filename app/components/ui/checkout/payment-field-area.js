// External dependencies
import { card } from 'creditcards';
import { bindHandlers } from 'react-bind-handlers';
import i18n from 'i18n-calypso';
import padStart from 'lodash/padStart';
import range from 'lodash/range';
import omit from 'lodash/omit';
import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import Country from 'components/containers/country';
import Form from 'components/ui/form';
import Input from 'components/ui/form/input';
import Select from 'components/ui/form/select';
import styles from './styles.scss';
import capitalize from 'lodash/capitalize';
import { removeInvalidInputProps } from 'lib/form';
import ValidationError from 'components/ui/form/validation-error';

class PaymentFieldArea extends Component {
	handleCreditCardNumberChange( event ) {
		const { value } = event.target;

		const rawFieldValue = card.parse( value );

		this.props.fields.number.onChange( card.format( rawFieldValue ) );
	}

	renderCreditCards() {
		const supportedCards = [
			'Visa',
			'MasterCard',
			'Discover',
			'American Express',
		];
		const number = this.props.fields.number.value;
		const cardType = card.type( card.parse( number ), true );
		const enableAllCards = supportedCards.indexOf( cardType ) === -1;
		const classes = {
			visa: ( enableAllCards || cardType === 'Visa' ) ? styles.visa : styles.visaDisabled,
			mastercard: ( enableAllCards || cardType === 'MasterCard' ) ? styles.mastercard : styles.mastercardDisabled,
			discover: ( enableAllCards || cardType === 'Discover' ) ? styles.discover : styles.discoverDisabled,
			amex: ( enableAllCards || cardType === 'American Express' ) ? styles.amex : styles.amexDisabled,
		};

		return (
			<div className={ styles.creditCards }>
				<div alt="Visa" className={ classes.visa } />
				<div alt="Mastercard" className={ classes.mastercard } />
				<div alt="Discover" className={ classes.discover } />
				<div alt="American Express" className={ classes.amex } />
			</div>
		);
	}

	render() {
		const months = i18n.moment.months(),
			{ fields } = this.props;

		return (
			<Form.FieldArea>
				<fieldset>
					<label>{ i18n.translate( 'Name on Card' ) }</label>

					<Input
						type="text"
						field={ fields.name }
						autoFocus
						dir="ltr"
					/>

					<ValidationError field={ fields.name } />
				</fieldset>

				<fieldset>
					<label className={ styles.numberLabel }>{ i18n.translate( 'Card Number' ) }</label>

					{ this.renderCreditCards() }

					<Input
						type="text"
						field={ omit( fields.number, 'onChange' ) }
						dir="ltr"
						onChange={ this.handleCreditCardNumberChange }
						pattern="[0-9 ]*"
					/>

					<ValidationError field={ fields.number } />
				</fieldset>

				<fieldset>
					<label>{ i18n.translate( 'Expiration' ) }</label>

					<div className={ styles.expiration }>
						<Select
							{ ...removeInvalidInputProps( fields.expirationMonth ) }
							className={ styles.expirationMonth }
						>
							<option value="">{ i18n.translate( 'Month' ) }</option>
							{ months.map( ( monthName, monthIndex ) => {
								const monthNumber = padStart( monthIndex + 1, 2, '0' );

								return (
									<option value={ monthNumber } key={ monthNumber }>
										{ monthNumber } - { capitalize( monthName ) }
									</option>
								);
							} ) }
						</Select>

						<Select
							{ ...removeInvalidInputProps( fields.expirationYear ) }
							className={ styles.expirationYear }
						>
							<option value="">{ i18n.translate( 'Year' ) }</option>
							{
								range( ( new Date() ).getFullYear(), ( new Date() ).getFullYear() + 21 ).map(
									( year ) => <option value={ padStart( year - 2000, 2, '0' ) }
										key={ year }>{ year }</option>
								)
							}
						</Select>
					</div>

					<ValidationError fields={ [
						fields.expirationMonth,
						fields.expirationYear
					] } />
				</fieldset>

				<fieldset className={ styles.securityCode }>
					<label>{ i18n.translate( 'Security Code' ) }</label>

					<Input
						type="tel"
						field={ fields.cvv }
						pattern="[0-9]*"
						dir="ltr"
					/>

					<ValidationError field={ fields.cvv } />
				</fieldset>

				<fieldset>
					<label>{ i18n.translate( 'Country' ) }</label>

					<Country
						field={ fields.countryCode }
						supportedBy="checkout"
					/>

					<ValidationError field={ fields.countryCode } />
				</fieldset>

				<fieldset>
					<label>{ i18n.translate( 'Postal Code' ) }</label>

					<Input
						type="text"
						field={ fields.postalCode }
						dir="ltr"
					/>

					<ValidationError field={ fields.postalCode } />
				</fieldset>
			</Form.FieldArea>
		);
	}
}

PaymentFieldArea.propTypes = {
	fields: PropTypes.object.isRequired
};

export default withStyles( styles )( bindHandlers( PaymentFieldArea ) );
