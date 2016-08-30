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
import DomainInput from 'components/ui/form/domain-input';
import Email from 'components/ui/form/email';
import PartialUnderline from 'components/ui/partial-underline';
import { subscribeUser } from 'actions/learn-more';
import ValidationError from 'components/ui/form/validation-error';
import { withTld } from 'lib/domains';

class LearnMore extends React.Component {
	handleSubscribeUser() {
		const { addNotice, fields: { email, domain }, resetForm } = this.props;

		subscribeUser( email.value, withTld( domain.value ) ).then( ( { result, msg } ) => {
			addNotice( {
				message: msg.replace( /\d+ - (.*)/, '$1' ),
				status: result
			} );

			if ( 'success' === result ) {
				resetForm();
			}
		} ).catch( error => {
			addNotice( {
				message: error.message,
				status: 'error'
			} );
		} );
	}

	render() {
		const { fields, handleSubmit } = this.props;

		return (
			<SunriseStep>
				<DocumentTitle title={ i18n.translate( 'Get .blog updates in your email' ) } />
				<SunriseStep.Header className={ styles.container }>
					<h1 className={ styles.heading }>{ i18n.translate( 'Get .blog updates in your email' ) }</h1>
					<div className={ styles.text }>
						{
							i18n.translate( 'Domains that are still not taken when .blog launches will be available ' +
								'starting at $30 a year. Sign up to receive updates about .blog and be the first ' +
								'to hear when it goes live.' )
						}
					</div>
				</SunriseStep.Header>
				<div className={ styles.formContainer }>
					<form className={ styles.form } onSubmit={ handleSubmit( this.handleSubscribeUser ) }>
						<div className={ styles.inputContainer }>
							<DomainInput
								inputClassName={ styles.input }
								field={ fields.domain }
								placeholder={ i18n.translate( 'What domain are you interested in?' ) }
							/>
							<ValidationError field={ fields.domain } />
						</div>

						<div className={ styles.inputContainer }>
							<Email
								inputClassName={ styles.input }
								field={ fields.email }
								placeholder={ i18n.translate( 'Enter your email' ) }
							/>
							<ValidationError field={ fields.email } />
						</div>

						<div className={ styles.buttonContainer }>
							<Button>{ i18n.translate( 'Get updates' ) }</Button>
						</div>
					</form>
				</div>

				<div className={ styles.content }>
					<PartialUnderline centered>
						<h2>{ i18n.translate( 'How does the .blog launch work?' ) }</h2>
					</PartialUnderline>

					<div className={ styles.threeBoxes }>
						<div>
							<div className={ styles.boxTitle }>
								{ i18n.translate( 'Trademark owners' ) }
							</div>
							<div className={ styles.boxTitleNotice }>
								{ i18n.translate( '* Not offered on get.blog' ) }
							</div>
							<div className={ styles.boxContent }>
								{ i18n.translate( 'Registered trademark owners can apply for .blog domains associated with their brands.' ) }
							</div>
						</div>

						<div>
							<div className={ styles.boxTitle }>
								{ i18n.translate( 'Open for application' ) }
							</div>
							<div className={ styles.boxTitleNotice }>
								{ i18n.translate( 'August 18th - November 2nd' ) }
							</div>
							<div className={ styles.boxContent }>
								{ i18n.translate( 'During the "Landrush" period, anyone can apply for their desired .blog domains.' ) }
							</div>
						</div>

						<div>
							<div className={ styles.boxTitle }>
								{ i18n.translate( 'Public launch' ) }
							</div>
							<div className={ styles.boxTitleNotice }>
								{ i18n.translate( 'November 21st' ) }
							</div>
							<div className={ styles.boxContent }>
								{ i18n.translate( 'When .blog goes live, anyone will be able to register a .blog domain in seconds.' ) }
							</div>
						</div>
					</div>
				</div>
			</SunriseStep>
		);
	}
}

LearnMore.propTypes = {
	addNotice: PropTypes.func.isRequired,
	fields: PropTypes.object.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	resetForm: PropTypes.func.isRequired
};

export default withStyles( styles )( bindHandlers( LearnMore ) );
