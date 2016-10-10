// External dependencies
import i18n from 'i18n-calypso';
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import DocumentTitle from 'components/ui/document-title';
import styles from './styles.scss';
import SunriseStep from 'components/ui/sunrise-step';

const ConnectNewBlogToWordpress = () => {
	return (
		<SunriseStep>
			<DocumentTitle title={ i18n.translate( 'Set up domain' ) } />

			<SunriseStep.Header>
				<h1>{ i18n.translate( 'Connect with Wordpress' ) }</h1>
			</SunriseStep.Header>
		</SunriseStep>
	);
};

export default withStyles( styles )( ConnectNewBlogToWordpress );
