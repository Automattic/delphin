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
import styles from './styles.scss';
import SunriseStep from 'components/ui/sunrise-step';

class ConnectExistingBlog extends Component {
	handleSubmit( event ) {
		event.preventDefault();

		const { domainName, hostName, redirect } = this.props;

		redirect( 'connectingExistingBlog', { pathParams: { domainName, hostName } } );
	}

	render() {
		const { domainName, hostName } = this.props;

		return (
			<SunriseStep>
				<DocumentTitle title={ i18n.translate( 'Set up domain' ) } />

				<SunriseStep.Header>
					<h1>{ i18n.translate( 'Good news, we found %(hostName)s!', {
						args: { hostName }
					} ) }</h1>

					<h2>
						{ preventWidows( i18n.translate( "It looks like it's a WordPress.com site. We can connect {{strong}}%(domainName)s{{/strong}} to WordPress.com for you.", {
							args: { domainName },
							components: { strong: <strong /> }
						} ), 2 ) }
					</h2>
				</SunriseStep.Header>

				<Form>
					<Form.FieldArea>
						<p>
							{ i18n.translate( 'Are you ready to connect %(domainName)s to %(hostName)s?', {
								args: { hostName, domainName }
							} ) }
						</p>

						<Button className={ styles.button } onClick={ this.handleSubmit }>
							{ i18n.translate( 'Yes, Connect Now' ) }
						</Button>
					</Form.FieldArea>

					<Form.SubmitArea>
						<Link to={ getPath( 'findExistingBlog', { domainName } ) }>
							{ i18n.translate( 'Back' ) }
						</Link>
					</Form.SubmitArea>
				</Form>
			</SunriseStep>
		);
	}
}

ConnectExistingBlog.propTypes = {
	domainName: PropTypes.string.isRequired,
	hostName: PropTypes.string.isRequired,
	redirect: PropTypes.func.isRequired
};

export default withStyles( styles )( bindHandlers( ConnectExistingBlog ) );
