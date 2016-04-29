// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import Form from 'components/ui/form';
import i18n from 'lib/i18n';
import styles from './styles.scss';
import Tooltip from 'components/ui/tooltip';

const CreateUser = React.createClass( {
	propTypes: {
		fields: PropTypes.object.isRequired,
		handleSubmit: PropTypes.func.isRequired,
		redirectToSearch: PropTypes.func.isRequired,
		redirectToVerifyUser: PropTypes.func.isRequired,
		removeUser: PropTypes.func.isRequired,
		user: PropTypes.object.isRequired
	},

	componentDidMount() {
		if ( this.props.user.isLoggedIn ) {
			this.props.redirectToSearch();
		} else {
			this.props.removeUser();
		}
	},

	componentWillReceiveProps( nextProps ) {
		if ( ! this.props.user.wasCreated && nextProps.user.wasCreated ) {
			this.props.redirectToVerifyUser();
		}
	},

	render() {
		const { handleSubmit, fields, user } = this.props;

		return (
			<div className={ styles.createUser }>
				<Form
					onSubmit={ handleSubmit }
					fieldArea={
						<fieldset>
							<label>{ i18n.translate( 'Email address:' ) }</label>
							<input { ...fields.email } autoFocus />
						</fieldset>
					}
					submitArea={
						<button disabled={ user.isUpdating }>
							{ i18n.translate( 'Next' ) }
						</button>
					} />
				<Tooltip
					href="https://wordpress.com"
					target="_blank"
					className={ styles.tooltip }
					text={ i18n.translate( 'Your account will be linked with a new or existing account on WordPress.com.' ) }>
					{ i18n.translate( 'Powered by WordPress.com' ) }
				</Tooltip>
			</div>
		);
	}
} );

export default withStyles( styles )( CreateUser );
