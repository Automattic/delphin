// External dependencies
import { bindHandlers } from 'react-bind-handlers';
import i18n from 'i18n-calypso';
import { Link } from 'react-router';
import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import Button from 'components/ui/button';
import DocumentTitle from 'components/ui/document-title';
import { getPath } from 'routes';
import Form from 'components/ui/form';
import { preventWidows } from 'lib/formatters';
import Radio from 'components/ui/form/radio';
import styles from '../styles.scss';
import SunriseStep from 'components/ui/sunrise-step';

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
			<SunriseStep>
				<DocumentTitle title={ i18n.translate( 'Set up domain' ) } />

				<SunriseStep.Header>
					<h1 className={ styles.header }>
						{ i18n.translate( 'Setup: {{strong}}Tell us what you want{{/strong}}', {
							components: {
								strong: <strong />
							}
						} ) }
					</h1>
					<h2 className={ styles.subHeader }>{ i18n.translate( "Based on your needs we'll show you the best options for creating your new blog." ) }</h2>
				</SunriseStep.Header>
				<Form onSubmit={ handleSubmit( this.handleSubmit ) }>
					<Form.FieldArea>
						<p>
							{ i18n.translate( 'What best fits your needs & preferences for your new blog?' ) }
						</p>

						<strong className={ styles.preLabel }>
							{ i18n.translate( 'Simple & quick' ) }
						</strong>
						<div className={ styles.hostButton }>
							<Radio
								className={ styles.radio }
								{ ...needs }
								id="simple"
								value="simple"
								checked={ needs.value === 'simple' }
							/>
							<label className={ styles.label } htmlFor="simple">
								<h3 className={ styles.labelHost }>
									Simple
								</h3>
								<p className={ styles.labelDescription }>
									{
										preventWidows( i18n.translate( 'Having a simple tool (with no coding) is more ' +
											'important than full control over the layout and look.' ), 2 )
									}
								</p>
							</label>
						</div>

						<strong className={ styles.preLabel }>
							{ i18n.translate( 'I want more control and power:' ) }
						</strong>
						<div className={ styles.hostButton }>
							<Radio
								className={ styles.radio }
								{ ...needs }
								id="control"
								value="control"
								checked={ needs.value === 'control' }
							/>
							<label className={ styles.label } htmlFor="control">
								<h3 className={ styles.labelHost }>
									{ i18n.translate( 'More control & power' ) }
								</h3>
								<p className={ styles.labelDescription }>
									{
										preventWidows( i18n.translate( 'I want full control over the look and feel ' +
											"and I don't mind getting my hands dirty with code as needed." ), 2 )
									}
								</p>
							</label>
						</div>
					</Form.FieldArea>
					<Form.SubmitArea>
						<Button disabled={ this.isSubmitButtonDisabled() }>
							{ i18n.translate( 'Next' ) }
						</Button>
					</Form.SubmitArea>
				</Form>

				<SunriseStep.Footer>
					<Link to={ getPath( 'selectBlogType', { domainName } ) }>
						{ i18n.translate( 'Back' ) }
					</Link>
				</SunriseStep.Footer>
			</SunriseStep>
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
