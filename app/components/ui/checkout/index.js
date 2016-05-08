// External dependencies
import i18n from 'lib/i18n';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

const Checkout = React.createClass( {
	propTypes: {
		checkout: PropTypes.object.isRequired,
		createSite: PropTypes.func.isRequired,
		createTransaction: PropTypes.func.isRequired,
		createUser: PropTypes.func.isRequired,
		redirectToSearch: PropTypes.func.isRequired,
		redirectToSuccess: PropTypes.func.isRequired
	},

	getInitialState() {
		return {
			form: {
				email: `drew.blaisdell+${ Math.ceil( Math.random() * 999999 ) }@automattic.com`,
				'credit-card-number': 4446186116594038,
				'postal-code': 97227,
				'expiration-date': '03/17',
				cvv: 123
			},
			submiting: false
		};
	},

	componentDidMount() {
		if ( ! this.props.checkout.domain ) {
			this.props.redirectToSearch();
		}
	},

	componentWillReceiveProps( nextProps ) {
		const { checkout } = nextProps,
			{ form } = this.state;

		if ( ! checkout ) {
			return;
		}

		if ( checkout.user && ! checkout.site ) {
			return this.props.createSite( Object.assign( {}, this.state.form, { domain: checkout.domain } ) );
		}

		if ( checkout.site && ! checkout.transaction ) {
			return this.props.createTransaction( Object.assign( {}, form, { blogId: checkout.site.blogId, domain: checkout.domain } ) );
		}

		if ( checkout.transaction ) {
			this.props.redirectToSuccess();
		}
	},

	createSite() {
		const rand = Math.ceil( Math.random() * 990000 );

		this.props.createSite( `foobarbaz${ rand }` );
	},

	renderUserDetails() {
		if ( ! this.props.checkout.user ) {
			return null;
		}

		const { username, email, password, bearerToken } = this.props.checkout.user;

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

		this.props.createUser( this.state.form );
	},

	renderForm() {
		if ( this.state.submitting ) {
			return null;
		}

		return (
			<form className={ styles.form } onChange={ this.updateForm } onSubmit={ this.checkout }>
				<label>{ i18n.translate( 'username' ) }</label>
				<input type="text" name="username" autoFocus />
				<label>{ i18n.translate( 'email' ) }</label>
				<input type="text" name="email" onChange={ this.updateForm } value={ this.state.form.email } />
				<label>{ i18n.translate( 'password' ) }</label>
				<input type="text" name="password" />
				<label>{ i18n.translate( 'name' ) }</label>
				<input type="text" name="name" />
				<label>{ i18n.translate( 'credit card #' ) }</label>
				<input type="text" name="credit-card-number" onChange={ this.updateForm } value={ this.state.form['credit-card-number'] } />
				<label>{ i18n.translate( 'cvv' ) }</label>
				<input type="text" name="cvv" onChange={ this.updateForm } value={ this.state.form.cvv } />
				<label>{ i18n.translate( 'expiration date in MM/YY format' ) }</label>
				<input type="text" name="expiration-date" onChange={ this.updateForm } value={ this.state.form['expiration-date'] } placeholder="01/20" />
				<label>{ i18n.translate( 'postal code' ) }</label>
				<input type="text" name="postal-code" onChange={ this.updateForm } value={ this.state.form['postal-code'] } />
				<br />
				<button>Checkout</button>
			</form>
		);
	},

	render() {
		return (
			<div>
				<h2>registering { this.props.checkout.domain }</h2>
				{ this.state.submitting && 'beep boop...' }
				{ this.renderForm() }
				{ this.renderUserDetails() }
				{ this.renderSiteDetails() }
			</div>
		);
	}
} );

export default withStyles( styles )( Checkout );
