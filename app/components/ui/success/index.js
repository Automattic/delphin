// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import RequireLogin from 'components/containers/require-login';
import DocumentTitle from 'components/ui/document-title';
import styles from './styles.scss';
import SunriseStep from 'components/ui/sunrise-step';
import withPageView from 'lib/analytics/with-page-view';
import scrollToTop from 'components/containers/scroll-to-top';
import Button from 'components/ui/button';
import { getPath } from 'routes';

class Success extends React.Component {
	componentDidMount() {
		this.props.fetchMyDomains();
		this.props.destroySetupForms();
	}

	render() {
		const { domain } = this.props;

		return (
			<SunriseStep className={ styles.step }>
				<DocumentTitle title={ i18n.translate( 'Success' ) } />

				<SunriseStep.Header className={ styles.header }>
					<h1 className={ styles.heading }>
						{ i18n.translate( '{{strong}}%(domain)s{{/strong}} is now yours!', {
							args: { domain },
							components: {
								strong: <strong />
							}
						} ) }
					</h1>
				</SunriseStep.Header>

				<div className={ styles.content }>

					<div className={ styles.text }>
						<p>
							{ i18n.translate( 'Your domain should start working right away, but it may not be reliable for the first few hours.' ) }
						</p>

						<p>
							{ i18n.translate(
								'Connect your existing blog or start a new one now.'
							) }
						</p>

						<p>
							<Button href={ getPath( 'selectBlogType', { domainName: domain } ) } className={ styles.successCta }>
								{ i18n.translate( 'Start setup' ) }
							</Button>
						</p>
					</div>
				</div>

				<SunriseStep.Footer>
					<Link to={ getPath( 'myDomains' ) }>
						{ i18n.translate( "I'll set up my domain later." ) }
					</Link>
				</SunriseStep.Footer>
			</SunriseStep>
		);
	}
}

Success.propTypes = {
	destroySetupForms: PropTypes.func.isRequired,
	domain: PropTypes.string,
	email: PropTypes.string,
	fetchMyDomains: PropTypes.func.isRequired,
	hasSelectedDomain: PropTypes.bool.isRequired,
	redirect: PropTypes.func.isRequired,
};

export default RequireLogin( scrollToTop( withStyles( styles )( withPageView( Success, 'Success' ) ) ) );
