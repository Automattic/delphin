// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';

// Internal dependencies
import LoadingScreen from 'components/ui/loading-screen';

class VerifyUserWithQuery extends React.Component {
	componentWillMount() {
		if ( ! process.env.BROWSER ) {
			return;
		}

		this.props.recordPageView();

		const { code, email, domain } = this.props.query,
			{ intention } = this.props;

		if ( domain ) {
			this.props.fetchDomainPrice( domain ).then( action => {
				this.props.selectDomain( action.result );
			} );
		}

		this.props.verifyUser(
			email,
			code
		).then( () => {
			if ( domain ) {
				this.props.redirect( 'contactInformation' );
			} else {
				this.props.redirect( 'home' );
			}
		} ).catch( error => {
			if ( intention === 'login' ) {
				this.props.redirect( 'loginUser' );
			}

			if ( intention === 'signup' ) {
				this.props.redirect( 'signupUser' );
			}

			this.props.addNotice( {
				message: error.code || i18n.translate( 'There was a problem with your email.' ),
				status: 'error'
			} );
		} );
	}

	render() {
		return <LoadingScreen />;
	}
}

VerifyUserWithQuery.propTypes = {
	addNotice: PropTypes.func.isRequired,
	fetchDomainPrice: PropTypes.func.isRequired,
	intention: PropTypes.string.isRequired,
	query: PropTypes.object.isRequired,
	recordPageView: PropTypes.func.isRequired,
	redirect: PropTypes.func.isRequired,
	selectDomain: PropTypes.func.isRequired,
	verifyUser: PropTypes.func.isRequired
};

export default VerifyUserWithQuery;
