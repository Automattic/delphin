// External dependencies
import React, { PropTypes } from 'react';

class WpcomLoginForm extends React.Component {
	constructor( props ) {
		super( props );

		this.saveRef = form => this.form = form;
	}

	componentDidMount() {
		this.form.submit();
	}

	render() {
		const {
			username,
			bearerToken,
		} = this.props;

		return (
			<form
				method="post"
				action="https://wordpress.com/wp-login.php"
				ref={ this.saveRef }
			>
				<input type="hidden" name="log" value={ username } />
				<input type="hidden" name="authorization" value={ 'Bearer ' + bearerToken } />
				<input type="hidden" name="redirect_to" value="https://wordpress.com" />
			</form>
		);
	}
}

WpcomLoginForm.propTypes = {
	bearerToken: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
};

export default WpcomLoginForm;
