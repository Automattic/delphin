// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import config from 'config';
import i18n from 'i18n-calypso';
import styles from './styles.scss';

const ResendSignupEmail = React.createClass( {
	propTypes: {
		connectUser: PropTypes.func.isRequired,
		domain: PropTypes.string,
		email: PropTypes.string.isRequired,
		intention: PropTypes.string.isRequired
	},

	getInitialState() {
		return { sent: false };
	},

	connectUser() {
		this.props.connectUser( this.props.email, this.props.intention, this.props.domain, () => {
			this.setState( { sent: true } );
		} );
	},

	render() {
		let text = i18n.translate(
			"On its way! If you don't receive it in within a few minutes, {{a}}send us a message{{/a}}.",
			{
				components: { a: <a href={ config( 'support_link' ) } /> }
			}
		);

		if ( ! this.state.sent ) {
			text = i18n.translate(
				"Can't find the email? {{a}}Resend it{{/a}}.",
				{
					components: { a: <a onClick={ this.connectUser } /> }
				}
			);
		}

		return (
			<div className={ styles.legend }>
				{ text }
			</div>
		);
	}
} );

export default withStyles( styles )( ResendSignupEmail );
