import { connect } from 'react-redux';
import React from 'react';
import { push } from 'react-router-redux';
import { createUser, createSite, createTransaction } from '../actions/index';

const Checkout = React.createClass( {
	componentDidMount() {
		if ( ! this.props.checkout.domain ) {
			this.props.redirect( '/search' );
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
				<button onClick={ this.props.createTransaction.bind( this, this.props.checkout.site + '.com', this.props.checkout.blogId ) }>create transaction</button>
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

	render() {
		return (
			<div>
				<h1>registering { this.props.checkout.domain }</h1>
				<button onClick={ this.createUser }>create user</button>
				{ this.renderUserDetails() }
				{ this.renderCreateSiteButton() }
				{ this.renderSiteDetails() }
				{ this.renderCheckoutButton() }
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
			}
		}
	}
)( Checkout );
