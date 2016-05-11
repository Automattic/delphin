// External dependencies
import React, { PropTypes } from 'react';

const Success = React.createClass( {
	propTypes: {
		redirectToHome: PropTypes.func.isRequired,
		transaction: PropTypes.object
	},

	componentWillMount() {
		if ( ! this.props.transaction ) {
			this.props.redirectToHome();
		}
	},

	render() {
		if ( ! this.props.transaction ) {
			return null;
		}

		const {
			domain,
			blogId
		} = this.props.transaction;

		return (
			<div style={ { textAlign: 'center' } }>
				<h2>You registered { domain }!!!</h2>
				<h3>we're so happy</h3>
				<h6>your blog's ID is { blogId }</h6>
			</div>
		);
	}
} );

export default Success;
