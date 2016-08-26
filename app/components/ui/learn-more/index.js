// External dependencies
import { bindHandlers } from 'react-bind-handlers';
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import DocumentTitle from 'components/ui/document-title';
import styles from './styles.scss';
import SunriseStep from 'components/ui/sunrise-step';
import Button from 'components/ui/button';
import Input from 'components/ui/form/input';
import { subscribeUser } from 'actions/learn-more';

class LearnMore extends React.Component {
	handleSubscribeUser( event ) {
		const { addNotice, fields: { email, domain } } = this.props;

		event.preventDefault();

		subscribeUser( email.value, domain.value ).then( ( { result, msg } ) => {
			addNotice( {
				message: msg.replace( /\d+ - (.*)/, '$1' ),
				status: result
			} );
		} );
	}

	render() {
		const { fields } = this.props;
		return (
			<SunriseStep>
				<DocumentTitle title={ i18n.translate( 'Get .blog updates in your email' ) } />
				<SunriseStep.Header className={ styles.container }>
					<h1 className={ styles.heading }>{ i18n.translate( 'Get .blog updates in your email' ) }</h1>
					<div className={ styles.text }>
						{ i18n.translate( 'Sign up to receive updates about the launch and be the first to know when you can claim your own .blog domain' ) }
					</div>
				</SunriseStep.Header>
				<div className={ styles.formContainer }>
					<form className={ styles.form } onSubmit={ this.handleSubscribeUser }>
						<Input
							className={ styles.inputContainer }
							inputClassName={ styles.input }
							field={ fields.domain }
							placeholder={ i18n.translate( 'What domain are you interested in?' ) }
						/>

						<Input
							className={ styles.inputContainer }
							inputClassName={ styles.input }
							field={ fields.email }
							placeholder={ i18n.translate( 'Enter your email' ) }
						/>

						<Button>{ i18n.translate( 'Get updates' ) }</Button>
					</form>
				</div>
				<SunriseStep.Footer>
					<h2>{ i18n.translate( 'How does the .blog launch work?' ) }</h2>
					<div>
						<div>{ i18n.translate( 'Trademark owners' ) }</div>
						<div>{ i18n.translate( '* Not offered on get.blog' ) }</div>
						<div>{ i18n.translate( 'Registered trademark owners can apply for .blog domains associated with their brands.' ) }</div>
					</div>

					<div>
						<div>{ i18n.translate( 'Open for application' ) }</div>
						<div>{ i18n.translate( 'August 18th - November 2nd' ) }</div>
						<div>{ i18n.translate( 'During the "Landrush" period, anyone can apply for their desired .blog domains.' ) }</div>
					</div>

					<div>
						<div>{ i18n.translate( 'Public launch' ) }</div>
						<div>{ i18n.translate( 'November 21st' ) }</div>
						<div>{ i18n.translate( 'When .blog goes live, anyone will be able to register a .blog domain in seconds.' ) }</div>
					</div>
				</SunriseStep.Footer>
			</SunriseStep>
		);
	}
}

LearnMore.propTypes = {
	addNotice: PropTypes.func.isRequired,
	fields: PropTypes.object.isRequired
};

export default withStyles( styles )( bindHandlers( LearnMore ) );
