// External dependencies
import { bindHandlers } from 'react-bind-handlers';
import i18n from 'i18n-calypso';
import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import SetUpDomainBackLink from 'components/ui/set-up-domain/back-link';
import Button from 'components/ui/button';
import DocumentTitle from 'components/ui/document-title';
import { getPath } from 'routes';
import Form from 'components/ui/form';
import { preventWidows } from 'lib/formatters';
import ProgressHeader from 'components/containers/set-up-domain/progress-header';
import Radio from 'components/ui/form/radio';
import styles from './styles.scss';

class SelectNewBlogNeeds extends Component {
	componentWillMount() {
		const { hasAnsweredPreviousQuestion, domainName, redirect } = this.props;

		if ( ! hasAnsweredPreviousQuestion ) {
			redirect( 'selectBlogType', { pathParams: { domainName } } );
		}
	}

	handleSubmit( { needs } ) {
		const { redirect, domainName } = this.props;

		redirect( 'selectNewBlogHost', { pathParams: { domainName, needs } } );
	}

	isSubmitButtonDisabled() {
		const { invalid, pristine, submitting } = this.props;

		return invalid || pristine || submitting;
	}

	render() {
		const {
			domainName,
			handleSubmit,
			fields: { needs },
		} = this.props;

		return (
			<div className={ styles.domainSetup }>
				<DocumentTitle title={ i18n.translate( 'Set up domain' ) } />

				<ProgressHeader
					content={ i18n.translate( 'Tell us about your needs.' ) }
					progress={ 30 }
				/>

				<Form onSubmit={ handleSubmit( this.handleSubmit ) }>
					<Form.FieldArea>
						<p className={ styles.actionLabel }>
							{ i18n.translate( 'How do you want to build your new blog?' ) }
						</p>

						<Radio
							className={ styles.radio }
							{ ...needs }
							id="simple"
							value="simple"
							checked={ needs.value === 'simple' }
						/>
						<label className={ styles.label } htmlFor="simple">
							<h3 className={ styles.labelHeader }>
								{ i18n.translate( 'Simple & quick' ) }
							</h3>
							<p className={ styles.labelDescription }>
								{
									preventWidows( i18n.translate( 'I want easy-to-use tools ' +
										'and require fast, high quality results.' ), 2 )
								}
							</p>
						</label>

						<Radio
							className={ styles.radio }
							{ ...needs }
							id="control"
							value="control"
							checked={ needs.value === 'control' }
						/>
						<label className={ styles.label } htmlFor="control">
							<h3 className={ styles.labelHeader }>
								{ i18n.translate( 'More control & power' ) }
							</h3>
							<p className={ styles.labelDescription }>
								{
									preventWidows( i18n.translate( 'I want to customize my blog\'s code ' +
										'and require total control over all features.' ), 2 )
								}
							</p>
						</label>
					</Form.FieldArea>
					<Form.SubmitArea>
						<Button disabled={ this.isSubmitButtonDisabled() }>
							{ i18n.translate( 'Next' ) }
						</Button>
					</Form.SubmitArea>
				</Form>

				<div className={ styles.footer }>
					<SetUpDomainBackLink
						stepName="selectNewBlogNeeds"
						to={ getPath( 'selectBlogType', { domainName } ) }
					/>
				</div>
			</div>
		);
	}
}

SelectNewBlogNeeds.propTypes = {
	domainName: PropTypes.string.isRequired,
	fields: PropTypes.object.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	hasAnsweredPreviousQuestion: PropTypes.bool.isRequired,
	invalid: PropTypes.bool.isRequired,
	pristine: PropTypes.bool.isRequired,
	redirect: PropTypes.func.isRequired,
	submitting: PropTypes.bool.isRequired,
};

export default withStyles( styles )( bindHandlers( SelectNewBlogNeeds ) );
