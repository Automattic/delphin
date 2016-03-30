import { connect } from 'react-redux';
import React from 'react';
import { push } from 'react-router-redux';
import { createUser, createSite, createTransaction, processCheckout } from '../actions/index';

const Checkout = React.createClass( {
	getInitialState() {
		return {
			form: {
				email: `drew.blaisdell+${ Math.ceil( Math.random() * 999999 ) }@automattic.com`
			}
		};
	},

	componentDidMount() {
		if ( ! this.props.checkout.domain ) {
			this.props.redirect( '/search' );
		}
	},

	componentWillReceiveProps( nextProps ) {
		if ( nextProps.checkout.form ) {
			this.props.redirect( '/success' );
		}
	},

	createUser() {
		const rand = Math.ceil( Math.random() * 100000 );

		this.props.createUser(
			'test' + rand,
			`drew.blaisdell+${ rand }@automattic.com`,
			'thisisaTERRIBLEpassword'
		);
	},

	createSite() {
		const rand = Math.ceil( Math.random() * 990000 );

		this.props.createSite( `foobarbaz${ rand }` );
	},

	renderUserDetails() {
		if ( ! this.props.checkout.username ) {
			return null;
		}

		const { username, email, password, bearerToken } = this.props.checkout;

		return (
			<div>
				{ username },
				{ ' ' }
				{ email },
				{ ' ' }
				{ password },
				{ ' ' }
				{ bearerToken },
				{ ' ' }
			</div>
		);
	},

	renderCreateSiteButton() {
		if ( ! this.props.checkout.username ) {
			return null;
		}

		return (
			<div>
				<button onClick={ this.createSite }>create site</button>
			</div>
		);
	},

	renderSiteDetails() {
		const { site } = this.props.checkout;

		if ( ! site ) {
			return null;
		}

		return (
			<div>
				{ site }
			</div>
		);
	},

	renderCheckoutButton() {
		if ( ! this.props.checkout.site ) {
			return null;
		}

		return (
			<div>
				<button onClick={ this.props.createTransaction.bind( this, this.props.checkout.domain, this.props.checkout.blogId ) }>create transaction</button>
			</div>
		);
	},

	renderCheckoutDetails() {
		const { transaction } = this.props.checkout;

		if ( ! transaction ) {
			return null;
		}

		return (
			<div>
				{ transaction }
			</div>
		);
	},

	updateForm( event ) {
		const { form } = this.state;

		this.setState( { form: Object.assign( {}, form, { [ event.target.name ]: event.target.value } ) } );
	},

	checkout( event ) {
		event.preventDefault();

		this.props.processCheckout( Object.assign( {}, this.state.form, { domain: this.props.checkout.domain } ) );
	},

	render() {
		return (
			<div>
				<h1>registering { this.props.checkout.domain }</h1>
				<form onChange={ this.updateForm } onSubmit={ this.checkout }>
					<label>username</label>
					<input type="text" name="username" />
					<label>email</label>
					<input type="text" name="email" onChange={ this.updateForm } value={ this.state.form.email } />
					<label>password</label>
					<input type="text" name="password" />
					<label>name</label>
					<input type="text" name="name" />
					<label>credit card #</label>
					<input type="text" name="credit-card-number" />
					<label>cvv</label>
					<input type="text" name="cvv" />
					<label>expiration date in MM/YY format</label>
					<input type="text" name="expiration-date" placeholder="01/20" />
					<label>postal code</label>
					<input type="text" name="postal-code" />
					<br />
					<button>Checkout</button>
				</form>
				{ this.renderUserDetails() }
				{ this.renderSiteDetails() }
				{ this.renderCheckoutDetails() }
			</div>
		);
	}
} );

export default connect(
	state => {
		return { checkout: state.checkout };
	},
	( dispatch, props ) => {
		return {
			redirect: url => {
				dispatch( push( url ) );
			},
			createSite: slug => {
				dispatch( createSite( slug ) );
			},
			createUser: ( username, email, password ) => {
				dispatch( createUser( username, email, password ) );
			},
			createTransaction: ( domainName, blogId ) => {
				dispatch( createTransaction( domainName, blogId ) );
			},
			processCheckout: form => {
				dispatch( processCheckout( form ) );
			}
		}
	}
)( Checkout );
