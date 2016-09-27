// External dependencies
import { bindHandlers } from 'react-bind-handlers';
import i18n from 'i18n-calypso';
import { Link } from 'react-router';
import React, { Component, PropTypes } from 'react';

// Internal dependencies
import Button from 'components/ui/button';
import { getPath } from 'routes';
import Form from 'components/ui/form';
import Input from 'components/ui/form/input';
import { preventWidows } from 'lib/formatters';
import SunriseStep from 'components/ui/sunrise-step';

class SetUpExistingBlog extends Component {
	handleSubmit() {
		alert( 'TODO' );
	}

	render() {
		const { domainName, fields, handleSubmit } = this.props;

		return (
			<SunriseStep>
				<SunriseStep.Header>
					<h1>{ i18n.translate( 'Connect to your blog' ) }</h1>

					<h2>
						{ preventWidows( i18n.translate( "Let us know the address to your current blog and we'll help you connect {{strong}}%(domainName)s{{/strong}} to it.", {
							args: { domainName },
							components: { strong: <strong /> }
						} ), 2 ) }
					</h2>
				</SunriseStep.Header>

				<Form onSubmit={ handleSubmit( this.handleSubmit ) }>
					<Form.FieldArea>
						<label>{ i18n.translate( 'Site Address:' ) }</label>

						<Input
							autoFocus
							field={ fields.url }
							placeholder={ i18n.translate( 'e.g. www.yourblog.com' ) }
							type="text" />
					</Form.FieldArea>

					<Form.SubmitArea>
						<Link to={ getPath( 'setUpDomain', { domainName } ) }>
							{ i18n.translate( 'Back' ) }
						</Link>

						<Button>
							{ i18n.translate( 'Next' ) }
						</Button>
					</Form.SubmitArea>
				</Form>
			</SunriseStep>
		);
	}
}

SetUpExistingBlog.propTypes = {
	domainName: PropTypes.string.isRequired,
	fields: PropTypes.object.isRequired,
	handleSubmit: PropTypes.func.isRequired
};

export default bindHandlers( SetUpExistingBlog ) ;
