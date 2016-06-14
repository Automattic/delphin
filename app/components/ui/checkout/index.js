// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import CheckoutProgressbar from 'components/ui/checkout-progressbar';
import styles from './styles.scss';
import capitalize from 'lodash/capitalize';
import FormToggle from 'components/ui/form/form-toggle';

const Checkout = React.createClass( {
	propTypes: {
		checkout: PropTypes.object.isRequired,
		createSite: PropTypes.func.isRequired,
		createTransaction: PropTypes.func.isRequired,
		isLoggedIn: PropTypes.bool.isRequired,
		redirectToSearch: PropTypes.func.isRequired,
		redirectToSignup: PropTypes.func.isRequired,
		redirectToSuccess: PropTypes.func.isRequired,
		user: PropTypes.object.isRequired
	},

	getInitialState() {
		return {
			form: {
				'credit-card-number': '',
				'expiration-date-month': '',
				'expiration-date-year': '',
				cvv: '',
				'privacy-protection': true
			},
			submiting: false
		};
	},

	componentDidMount() {
		if ( ! this.props.checkout.domain ) {
			this.props.redirectToSearch();
		}

		if ( ! this.props.isLoggedIn ) {
			this.props.redirectToSignup();
		}
	},

	componentWillReceiveProps( nextProps ) {
		const { checkout } = nextProps,
			{ form } = this.state;

		if ( ! checkout ) {
			return;
		}

		if ( checkout.site && ! checkout.transaction ) {
			return this.props.createTransaction( this.props.user, Object.assign( {}, form, { blogId: checkout.site.blogId, domain: checkout.domain } ) );
		}

		if ( checkout.transaction ) {
			this.props.redirectToSuccess();
		}
	},

	renderSiteDetails() {
		const { site } = this.props.checkout;

		if ( ! site ) {
			return null;
		}

		return (
			<div>
				{ site.domain } { site.blogId }
			</div>
		);
	},

	updateForm( event ) {
		const { form } = this.state;

		this.setState( { form: Object.assign( {}, form, { [ event.target.name ]: event.target.value } ) } );
	},

	checkout( event ) {
		event.preventDefault();

		this.setState( { submitting: true } );

		this.props.createSite( this.props.user, Object.assign( {}, this.state.form, { domain: this.props.checkout.domain } ) );
	},

	renderForm() {
		if ( this.state.submitting ) {
			return null;
		}

		const months = i18n.moment.months();

		return (
			<div>
				<CheckoutProgressbar currentStep={ 3 } />

				<form className={ styles.form } onChange={ this.updateForm } onSubmit={ this.checkout }>
					<div className={ styles.fieldArea }>
						<fieldset>
							<label>{ i18n.translate( 'Name on Card' ) }</label>
							<input type="text" name="name" autoFocus />
						</fieldset>

						<fieldset>
							<label>{ i18n.translate( 'Card Number' ) }</label>
							<input type="text" name="credit-card-number" onChange={ this.updateForm } value={ this.state.form[ 'credit-card-number' ] } />
						</fieldset>

						<fieldset>
							<label>{ i18n.translate( 'Expiration' ) }</label>
							<div className={ styles.expiration }>
								<select
									onChange={ this.updateForm }
									value={ this.state.form[ 'expiration-date-month' ] }
									className={ styles.expirationMonth }>
									<option>{ i18n.translate( 'Month' ) }</option>
									{ months.map( ( monthName, monthIndex ) =>
										<option key={ monthIndex } value={ monthIndex }>{ capitalize( monthName ) }</option>
									) }
								</select>

								<select
									onChange={ this.updateForm }
									value={ this.state.form[ 'expiration-date-year' ] }
									className={ styles.expirationYear }>
									<option>{ i18n.translate( 'Year' ) }</option>
									<option value="19">2019</option>
									<option value="18">2018</option>
									<option value="17">2017</option>
									<option value="16">2016</option>
								</select>
							</div>
						</fieldset>

						<fieldset className={ styles.securityCode }>
							<label>{ i18n.translate( 'Security Code' ) }</label>
							<input type="text" name="cvv" onChange={ this.updateForm } value={ this.state.form.cvv } />
						</fieldset>
					</div>

					<div className={ styles.orderSummary }>
						<h2>{ i18n.translate( 'Order Summary' ) }</h2>
						<div className={ styles.orderItem }>
							<span>{ this.props.checkout.domain }</span>
							<span>{ this.props.checkout.cost }</span>
						</div>
						<div className={ styles.orderItem }>
							<label>{ i18n.translate( 'Privacy Protection' ) }</label>
							<span>
								<FormToggle name="privacy-protection" checked={ this.state.form[ 'privacy-protection' ] } onChange={ this.updateForm } />
								<span className={ styles.privacyProtectionPrice }>FREE</span>
							</span>
						</div>
					</div>

					<div className={ styles.submitArea }>
						<button>{ i18n.translate( 'Checkout' ) }</button>
					</div>
				</form>
			</div>
		);
	},

	render() {
		return (
			<div>
				{ this.state.submitting && 'beep boop...' }
				{ this.renderForm() }
				{ this.renderSiteDetails() }
			</div>
		);
	}
} );

export default withStyles( styles )( Checkout );
