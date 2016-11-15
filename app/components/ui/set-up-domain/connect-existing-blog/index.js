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
import noop from 'lodash/noop';
import ProgressBar from 'components/ui/progress-bar';
import styles from './styles.scss';

class ConnectExistingBlog extends Component {
	handleSubmit( event ) {
		event.preventDefault();

		const { domainName, hostName, redirect, service, updateDomain } = this.props;

		updateDomain( domainName, service )
			.then( () => {
				redirect( 'confirmConnectExistingBlog', { pathParams: { domainName, hostName } } );
			} )
			.catch( noop );

		redirect( 'connectingExistingBlog', { pathParams: { domainName, hostName } } );
	}

	render() {
		const { domainName, hostName } = this.props;

		return (
			<div className={ styles.domainSetup }>
				<DocumentTitle title={ i18n.translate( 'Set up domain' ) } />

				<div className={ styles.headerContainer }>
					<div className={ styles.header }>
						<h1 className={ styles.headerText }>{ i18n.translate( 'Good news, we found %(hostName)s!', {
							args: { hostName }
						} ) }</h1>
						<ProgressBar progress={ 60 } />
					</div>
				</div>

				<Form onSubmit={ this.handleSubmit }>
					<Form.FieldArea>
						<p>
							{ i18n.translate( 'Are you ready to connect %(domainName)s to %(hostName)s?', {
								args: { hostName, domainName }
							} ) }
						</p>

						<Button className={ styles.button }>
							{ i18n.translate( 'Yes, Connect Now' ) }
						</Button>
					</Form.FieldArea>
				</Form>

				<div className={ styles.footer }>
					<Link to={ getPath( 'findExistingBlog', { domainName } ) }>
						{ i18n.translate( 'Back' ) }
					</Link>
				</div>
			</div>
		);
	}
}

ConnectExistingBlog.propTypes = {
	domainName: PropTypes.string.isRequired,
	hostName: PropTypes.string.isRequired,
	redirect: PropTypes.func.isRequired,
	service: PropTypes.string.isRequired,
	updateDomain: PropTypes.func.isRequired
};

export default withStyles( styles )( bindHandlers( ConnectExistingBlog ) );
