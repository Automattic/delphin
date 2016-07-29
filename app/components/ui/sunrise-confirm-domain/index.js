// External dependencies
import { bindHandlers } from 'react-bind-handlers';
import i18n from 'i18n-calypso';
import { Link } from 'react-router';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import Button from 'components/ui/button';
import DocumentTitle from 'components/ui/document-title';
import { getPath } from 'routes';
import styles from './styles.scss';
import SunriseStep from 'components/ui/sunrise-step';

class SunriseConfirmDomain extends React.Component {
	componentWillMount() {
		if ( ! this.props.hasSelectedDomain ) {
			this.props.redirect( 'home' );
		}
	}

	handleSubmit( event ) {
		event.preventDefault();

		if ( this.props.isLoggedIn ) {
			this.props.redirect( 'contactInformation' );
		} else {
			this.props.redirect( 'signupUser' );
		}
	}

	render() {
		const { domain } = this.props;

		return (
			<SunriseStep>
				<DocumentTitle title={ i18n.translate( 'Apply now' ) } />
				<SunriseStep.Header>
					<h1>
						{ i18n.translate( 'Apply now' ) }
					</h1>
					<h2>
						{ i18n.translate( 'Applications are open until November 9. ' +
							'If others apply for the same domain, ' +
							'you will be able to bid for it in an auction.' ) }
					</h2>
				</SunriseStep.Header>

				<SunriseStep.Form className={ styles.confirmDomainForm } onSubmit={ this.handleSubmit }>
					<h3>
						{ domain.domainName }
					</h3>
					<hr className={ styles.rule } />
					<div className={ styles.priceTag }>
						{ i18n.translate( '$250 Early Application' ) }
					</div>
					<div className={ styles.renewalInfo }>
						{ i18n.translate( '$30 registration + $220 application fee' ) }
					</div>
					<Button className={ styles.button }>
						{ i18n.translate( 'Apply for this domain' ) }
					</Button>
					<div className={ styles.backNotice }>
						<div>
							{ i18n.translate( 'Not what you wanted?' ) }
						</div>
						<Link to={ getPath( 'home' ) }>
							{ i18n.translate( 'Try a different domain' ) }
						</Link>
					</div>
				</SunriseStep.Form>
			</SunriseStep>
		);
	}
}

SunriseConfirmDomain.propTypes = {
	domain: PropTypes.object,
	hasSelectedDomain: PropTypes.bool.isRequired,
	isLoggedIn: PropTypes.bool.isRequired,
	redirect: PropTypes.func.isRequired
};

export default withStyles( styles )( bindHandlers( SunriseConfirmDomain ) );
