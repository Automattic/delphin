// External dependencies
import { bindHandlers } from 'react-bind-handlers';
import i18n from 'i18n-calypso';
import { Link } from 'react-router';
import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import Button from 'components/ui/button';
import Form from 'components/ui/form';
import { getPath } from 'routes';
import { preventWidows } from 'lib/formatters';
import styles from './styles.scss';
import SunriseStep from 'components/ui/sunrise-step';
import { removeInvalidInputProps } from 'lib/form';

class SetUpConnectOther extends Component {
	componentWillMount() {
		const { hasAnsweredPreviousQuestion, domainName, redirect } = this.props;

		if ( ! hasAnsweredPreviousQuestion ) {
			redirect( 'selectBlogType', { pathParams: { domainName } } );
		}
	}

	handleSubmit( { providerText } ) {
		if ( providerText ) {
			alert( 'Dispatching Happiness Engineers to handle ' + providerText );
		}
	}

	render() {
		const {
			domainName,
			handleSubmit,
			fields: { providerText },
		} = this.props;

		return (
			<SunriseStep>
				<SunriseStep.Header>
					<h1>{ i18n.translate( 'Where would you like to connect?' ) }</h1>
					<h2>
						{ preventWidows( i18n.translate( 'Currently we are only able to automatically connect your blog ' +
							"to WordPress.com (we're working on it though!)." +
							'No worries, our Happiness Engineers will assist you in ' +
							'connecting {{strong}}%(domainName)s{{/strong}} to your new site.',
							{
								args: { domainName },
								components: { strong: <strong /> }
							}
						), 2 ) }
					</h2>
				</SunriseStep.Header>
				<Form onSubmit={ handleSubmit( this.handleSubmit ) }>
					<Form.FieldArea>
						<label className={ styles.label } htmlFor="providerText">
							{ i18n.translate( 'Let us know where you would like to create your site.' ) }
						</label>
						<textarea
							id="providerText"
							name="providerText"
							className={ styles.otherProviderText }
							{ ...removeInvalidInputProps( providerText ) } />
					</Form.FieldArea>
					<Form.SubmitArea>
						<Link to={ getPath( 'setUpNewBlog', { domainName } ) }>
							{ i18n.translate( 'Back' ) }
						</Link>
						<Button disabled={ ! providerText.value }>
							{ i18n.translate( 'Submit Request' ) }
						</Button>
					</Form.SubmitArea>
				</Form>
			</SunriseStep>
		);
	}
}

SetUpConnectOther.propTypes = {
	domainName: PropTypes.string.isRequired,
	fields: PropTypes.object.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	hasAnsweredPreviousQuestion: PropTypes.bool.isRequired,
	redirect: PropTypes.func.isRequired,
};

export default withStyles( styles )( bindHandlers( SetUpConnectOther ) );
