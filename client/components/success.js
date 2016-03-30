import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

const Success = React.createClass( {
	componentWillMount() {
		if ( ! this.props.form ) {
			this.props.redirect( '/search' );
		}
	},

	render() {
		if ( ! this.props.form ) {
			return null;
		}

		const {
			domain,
			username,
			email,
			blogId,
			password
		} = this.props.form;

		return (
			<div style={{ textAlign: 'center' }}>
				<h1>You registered { domain }!!!</h1>
				<h2>we're so happy</h2>
				<h3>your username is { username }</h3>
				<h4>your email address is { email }</h4>
				<h5>your blog's ID is { blogId }</h5>
				<h6>sssshshshshsshhhh your password is { password } ssshhshshhshhs</h6>
			</div>
		);
	}
} );

export default connect(
	state => {
		return {
			form: state.checkout && state.checkout.form
		};
	},
	( dispatch, props ) => {
		return {
			redirect: url => {
				dispatch( push( url ) );
			}
		};
	}
)( Success );
