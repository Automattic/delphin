// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

class VerifyUserWithQuery extends React.Component {
	componentWillMount() {
		if ( ! process.env.BROWSER ) {
			return;
		}

		const { code, email } = this.props.query,
			{ intention } = this.props;

		this.props.verifyUser(
			email,
			code
		).then( () => {
			this.props.redirect( 'home' );

			this.props.addNotice( {
				message: i18n.translate( 'You have signed in to your account successfully!' ),
				status: 'success'
			} );
		} ).catch( error => {
			if ( intention === 'login' ) {
				this.props.redirect( 'loginUser' );
			}

			if ( intention === 'signup' ) {
				this.props.redirect( 'signupUser' );
			}

			this.props.addNotice( {
				message: error.code || i18n.translate( 'There was a problem signing in to your account.' ),
				status: 'error'
			} );
		} );
	}

	render() {
		const { intention } = this.props;

		return (
			<div className={ styles.container }>
				<h1 className={ styles.heading }>
					{ intention === 'login' && i18n.translate( 'Signing you in…' ) }
					{ intention === 'signup' && i18n.translate( 'Signing you in to your new account now…' ) }
				</h1>
			</div>
		);
	}
}

VerifyUserWithQuery.propTypes = {
	addNotice: PropTypes.func.isRequired,
	intention: PropTypes.string.isRequired,
	query: PropTypes.object.isRequired,
	redirect: PropTypes.func.isRequired,
	verifyUser: PropTypes.func.isRequired
};

export default withStyles( styles )( VerifyUserWithQuery );
