// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';

// Internal dependencies
import DocumentTitle from 'components/ui/document-title';

const Success = React.createClass( {
	propTypes: {
		isLoggedIn: PropTypes.bool.isRequired,
		isLoggedOut: PropTypes.bool.isRequired,
		redirectToHome: PropTypes.func.isRequired,
		redirectToLogin: PropTypes.func.isRequired,
		transaction: PropTypes.object
	},

	componentWillMount() {
		if ( this.props.isLoggedOut ) {
			this.props.redirectToLogin();
		} else if ( this.props.isLoggedIn && ! this.props.transaction.hasLoadedFromServer ) {
			this.props.redirectToHome();
		}
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
			<DocumentTitle title={ i18n.translate( 'Success' ) }>
				<div style={ { textAlign: 'center' } }>
					<h2>You registered { domain }!!!</h2>
					<h3>we're so happy</h3>
					<h6>your blog's ID is { blogId }</h6>
				</div>
			</DocumentTitle>
		);
	}
} );

export default Success;
