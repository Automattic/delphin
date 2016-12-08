// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import DocumentTitle from 'components/ui/document-title';
import styles from './styles.scss';
import SunriseStep from 'components/ui/sunrise-step';
import withPageView from 'lib/analytics/with-page-view';
import scrollToTop from 'components/containers/scroll-to-top';
import Button from 'components/ui/button';
import { getPath } from 'routes';

class Success extends React.Component {
	componentDidMount() {
		const { checkDomainAvailability, hasDomainAvailabilityLoaded } = this.props;

		if ( ! hasDomainAvailabilityLoaded ) {
			checkDomainAvailability();
		}

		this.props.fetchMyDomains();
		this.props.destroySetupForms();
	}

	renderTrademarkedDomain() {
		const { email } = this.props;

		return (
			<div>
				<div className={ styles.content }>
					<div className={ styles.text }>
						<p>
							{ i18n.translate(
								'We sent you an email to %(email)s with instructions for reviewing the trademark claim on this domain.', {
									args: { email },
								}
							) }
						</p>

						<p>
							{ i18n.translate(
								'To complete the registration, please review the terms and agree to them within 48 hours.'
							) }
						</p>

						<p>
							{ i18n.translate(
								'If you reject the terms, or if you don’t agree to them on time, ' +
								'your order will be canceled and you will be refunded automatically.'
							) }
						</p>
					</div>
				</div>

				<SunriseStep.Footer>
					<Link to={ getPath( 'myDomains' ) }>
						{ i18n.translate( 'Go to My Domains' ) }
					</Link>
				</SunriseStep.Footer>
			</div>
		);
	}

	renderDefaultDomain() {
		const { domain } = this.props;

		return (
			<div>
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
			</div>
		);
	}

	renderHeading() {
		const { domain, hasDomainAvailabilityLoaded, hasTrademarkClaim } = this.props;

		if ( ! hasDomainAvailabilityLoaded ) {
			return i18n.translate( 'Loading…' );
		}

		if ( hasTrademarkClaim ) {
			return i18n.translate( '{{strong}}%(domain)s{{/strong}} is almost yours!', {
				args: { domain },
				components: {
					strong: <strong />
				}
			} );
		}

		return i18n.translate( '{{strong}}%(domain)s{{/strong}} is now yours!', {
			args: { domain },
			components: {
				strong: <strong />
			}
		} );
	}

	renderContent() {
		const { hasDomainAvailabilityLoaded, hasTrademarkClaim } = this.props;

		if ( ! hasDomainAvailabilityLoaded ) {
			return null;
		}

		return ( hasTrademarkClaim ? this.renderTrademarkedDomain() : this.renderDefaultDomain() );
	}

	render() {
		return (
			<SunriseStep className={ styles.step }>
				<DocumentTitle title={ i18n.translate( 'Success' ) } />
				<SunriseStep.Header className={ styles.header }>
					<h1 className={ styles.heading }>
						{ this.renderHeading() }
					</h1>
				</SunriseStep.Header>
				{ this.renderContent() }
			</SunriseStep>
		);
	}
}

Success.propTypes = {
	checkDomainAvailability: PropTypes.func.isRequired,
	destroySetupForms: PropTypes.func.isRequired,
	domain: PropTypes.string,
	email: PropTypes.string,
	fetchMyDomains: PropTypes.func.isRequired,
	hasDomainAvailabilityLoaded: PropTypes.bool.isRequired,
	hasTrademarkClaim: PropTypes.bool.isRequired
};

export default scrollToTop( withStyles( styles )( withPageView( Success, 'Success' ) ) );
