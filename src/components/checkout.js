import { connect } from 'react-redux';
import React from 'react';

const Checkout = React.createClass( {
	render() {
		return (
			<div>{ this.props.checkout.domain }</div>
		);
	}
} );

export default connect(
	function( state ) {
		return { checkout: state.checkout };
	}
)( Checkout );
