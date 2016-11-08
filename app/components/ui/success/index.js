// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import DocumentTitle from 'components/ui/document-title';
import styles from './styles.scss';
import SunriseStep from 'components/ui/sunrise-step';
import withPageView from 'lib/analytics/with-page-view';
import scrollToTop from 'components/containers/scroll-to-top';

class Success extends React.Component {
	componentWillMount() {
		if ( ! this.props.hasSelectedDomain ) {
			this.props.redirect( 'home' );
		}
	}

	componentDidMount() {
		this.props.fetchMyDomains();
	}

	render() {
		const { domain, email } = this.props;

		return (
			<SunriseStep className={ styles.step }>
				<DocumentTitle title={ i18n.translate( 'Success' ) } />

				<SunriseStep.Header className={ styles.header }>
					<h1>
						{ i18n.translate( "That's a happy blog!" ) }
					</h1>

					<h2>
						{ i18n.translate( 'Your application for {{strong}}%(domain)s{{/strong}} is being processed.',
							{
								args: { domain },
								components: { strong: <strong /> }
							}
						) }
					</h2>
				</SunriseStep.Header>

				<div className={ styles.content }>

					<div className={ styles.text }>
						<p>
							{ i18n.translate(
								'We will hold on to your appllication and submit it ' +
								'automatically when .blog becomes widely available, on ' +
								'November 21st.'
								) }
						</p>

						<p>
							{ i18n.translate( "We'll email you at {{strong}}%(email)s{{/strong}} with the results of your application.",
								{
									args: { email },
									components: { strong: <strong /> }
								}
							) }
						</p>

						<p>
							{ i18n.translate(
								'Your application will be sumitted as soon as possible.' +
								'But we can\'t guarantee that no one else will be able to grab ' +
								'the domain you want even sooner. If your application fails, for ' +
								'any reason, we\'ll refund your payment in full.'
								) }
						</p>
					</div>
				</div>
			</SunriseStep>
		);
	}
}

Success.propTypes = {
	domain: PropTypes.string,
	email: PropTypes.string,
	fetchMyDomains: PropTypes.func.isRequired,
	hasSelectedDomain: PropTypes.bool.isRequired,
	redirect: PropTypes.func.isRequired,
};

export default scrollToTop( withStyles( styles )( withPageView( Success, 'Success' ) ) );
