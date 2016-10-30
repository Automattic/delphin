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
import Radio from 'components/ui/form/radio';
import styles from './styles.scss';
import SunriseStep from 'components/ui/sunrise-step';

class SelectBlogType extends Component {
	handleSubmit( values ) {
		const { redirect, domainName } = this.props;

		if ( values.newOrExisting === 'new' ) {
			redirect( 'selectNewBlogHost', { pathParams: { domainName } } );
		}

		if ( values.newOrExisting === 'existing' ) {
			redirect( 'findExistingBlog', { pathParams: { domainName } } );
		}
	}

	isSubmitButtonDisabled() {
		const { invalid, pristine, submitting } = this.props;

		return invalid || pristine || submitting;
	}

	render() {
		const {
			domainName,
			handleSubmit,
			fields: { newOrExisting },
		} = this.props;

		return (
			<SunriseStep>
				<DocumentTitle title={ i18n.translate( 'Set up domain' ) } />

				<SunriseStep.Header>
					<h1>{ i18n.translate( 'Tell us about your blog' ) }</h1>
				</SunriseStep.Header>

				<Form onSubmit={ handleSubmit( this.handleSubmit ) }>
					<Form.FieldArea>
						<p>
							{ i18n.translate( 'What do you want to do with %(domainName)s?', {
								args: { domainName }
							} ) }
						</p>

						<label className={ styles.label } htmlFor="existing">
							<Radio
								className={ styles.radio }
								{ ...newOrExisting }
								id="existing"
								value="existing"
								checked={ newOrExisting.value === 'existing' }
							/>
							{ i18n.translate( 'Use it for a blog I already started' ) }
						</label>

						<label className={ styles.label } htmlFor="new">
							<Radio
								className={ styles.radio }
								{ ...newOrExisting }
								id="new"
								value="new"
								checked={ newOrExisting.value === 'new' }
							/>
							{ i18n.translate( 'Start building a new blog now' ) }
						</label>
					</Form.FieldArea>

					<Form.SubmitArea>
						<Button disabled={ this.isSubmitButtonDisabled() }>
							{ i18n.translate( 'Next' ) }
						</Button>

						<Link to={ getPath( 'updateNameservers', { domainName } ) }>
							{ i18n.translate( 'Gimme nameservers' ) }
						</Link>
					</Form.SubmitArea>

					<Form.Footer>
						{ i18n.translate( 'If you already have a blog and you know its current address, enter it in the next step to connect it to %(domainName)s.', {
							args: { domainName }
						} ) }
					</Form.Footer>
				</Form>

				<SunriseStep.Footer>
					<Link to={ getPath( 'myDomains' ) }>
						{ i18n.translate( 'I\'ll set up my domain later' ) }
					</Link>
				</SunriseStep.Footer>
			</SunriseStep>
		);
	}
}

SelectBlogType.propTypes = {
	domainName: PropTypes.string.isRequired,
	fields: PropTypes.object.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	invalid: PropTypes.bool.isRequired,
	pristine: PropTypes.bool.isRequired,
	redirect: PropTypes.func.isRequired,
	submitting: PropTypes.bool.isRequired,
};

export default withStyles( styles )( bindHandlers( SelectBlogType ) );
