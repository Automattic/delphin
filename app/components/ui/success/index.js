// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';

const Success = React.createClass( {
	propTypes: {
		isLoggedIn: PropTypes.bool.isRequired,
		isLoggedOut: PropTypes.bool.isRequired,
		redirectToHome: PropTypes.func.isRequired,
		redirectToLogin: PropTypes.func.isRequired,
		transaction: PropTypes.object,
		updatePageTitle: PropTypes.func.isRequired
	},

	componentWillMount() {
		if ( this.props.isLoggedOut ) {
			this.props.redirectToLogin();
		} else if ( this.props.isLoggedIn && ! this.props.transaction.hasLoadedFromServer ) {
			this.props.redirectToHome();
		}

		this.props.updatePageTitle( i18n.translate( 'Success' ) );
	},

	componentWillReceiveProps( nextProps ) {
		if ( nextProps.isLoggedOut ) {
			nextProps.redirectToLogin();
		}
	},

	render() {
		if ( ! this.props.transaction.hasLoadedFromServer ) {
			return null;
		}

		const {
			domain,
			blogId
		} = this.props.transaction.data;

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
