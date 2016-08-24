// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import DocumentTitle from 'components/ui/document-title';
import styles from './styles.scss';
import SunriseStep from 'components/ui/sunrise-step';

const LearnMore = () => {
	return (
		<SunriseStep>
			<DocumentTitle title={ i18n.translate( 'Get .blog updates in your email' ) } />
			<SunriseStep.Header className={ styles.container }>
				<h1 className={ styles.heading }>{ i18n.translate( 'Get .blog updates in your email' ) }</h1>
				<div className={ styles.text }>
					{ i18n.translate( 'Sign up to receive updates about the launch and be the first to know when you can claim your own .blog domain' ) }
				</div>
			</SunriseStep.Header>
			<SunriseStep.Footer>
				<h2>{ i18n.translate( 'How does the .blog launch work?' ) }</h2>
				<div>
					<div>{ i18n.translate( 'Trademark owners' ) }</div>
					<div>{ i18n.translate( '* Not offered on get.blog' ) }</div>
					<div>{ i18n.translate( 'Registered trademark owners can apply for .blog domains associated with their brands.' ) }</div>
				</div>

				<div>
					<div>{ i18n.translate( 'Open for application' ) }</div>
					<div>{ i18n.translate( 'August 18th - November 2nd' ) }</div>
					<div>{ i18n.translate( 'During the "Landrush" period, anyone can apply for their desired .blog domains.' ) }</div>
				</div>

				<div>
					<div>{ i18n.translate( 'Public launch' ) }</div>
					<div>{ i18n.translate( 'November 21st' ) }</div>
					<div>{ i18n.translate( 'When .blog goes live, anyone will be able to register a .blog domain in seconds.' ) }</div>
				</div>
			</SunriseStep.Footer>
		</SunriseStep>
	);
};

LearnMore.propTypes = {
	children: PropTypes.node.isRequired
};

export default withStyles( styles )( LearnMore );
