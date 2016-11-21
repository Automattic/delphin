// External dependencies
import { bindHandlers } from 'react-bind-handlers';
import classNames from 'classnames';
import i18n from 'i18n-calypso';
import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { getServiceName } from 'lib/services';

// Internal dependencies
import styles from './styles.scss';

class DomainAutoConnected extends Component {
	handleResetDomain( event ) {
		event.preventDefault();

		const {
			addNotice,
			domainName,
			fetchMyDomains,
		} = this.props;

		this.props.updateDomain(
			domainName,
			'sawbuck'
		)
		.then( () => {
			addNotice( {
				status: 'success',
				message: i18n.translate( 'Your domain has been reset to the default settings.' )
			} );
		} )
		.then( fetchMyDomains )
		.catch( () => {
			addNotice( {
				status: 'error',
				message: i18n.translate( 'There was an error when resetting your domain.' )
			} );
		} );
	}

	render() {
		const { domainName, service } = this.props;

		return (
			<div className={ classNames( styles.domainCard, styles.connectedAuto ) }>
				<div className={ styles.domainHeading }>
					<h3>{ domainName }</h3>
				</div>
				<div className={ styles.domainDetails }>
					<p className={ classNames( styles.domainSetupAuto, styles[ service ] ) }>
						{ i18n.translate( 'This domain was automatically set up for your %(serviceName)s site.', {
							args: { serviceName: getServiceName( service ) },
							comment: 'serviceName is the name of a hosting service, e.g. WordPress.com.'
						} ) }
					</p>
				</div>
				<div className={ styles.domainCardFooter }>
					<a
						href="#"
						onClick={ this.handleResetDomain }
						className={ styles.resetSettings }
					>{ i18n.translate( 'Reset to default settings' ) }</a>
				</div>
			</div>
		);
	}
}

DomainAutoConnected.propTypes = {
	addNotice: PropTypes.func.isRequired,
	domainName: PropTypes.string.isRequired,
	fetchMyDomains: PropTypes.func.isRequired,
	service: PropTypes.string.isRequired,
	updateDomain: PropTypes.func.isRequired,
};

export default withStyles( styles )( bindHandlers( DomainAutoConnected ) );
