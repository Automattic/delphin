// External dependencies
import i18n from 'i18n-calypso';
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import FixedBackground from 'components/ui/fixed-background';
import Header from 'components/ui/header';
import withPageView from 'lib/analytics/with-page-view';
import styles from './styles.scss';

const NotFound = () => (
	<div className={ styles.layout }>
		<FixedBackground dark />

		<div className={ styles.content }>
			<Header />

			<div className={ styles.fourOhFour }>
				<h1>{ i18n.translate( 'Page not found' ) }</h1>
				<h2>{ i18n.translate( 'Sorry, the page you were looking for doesn\'t exist or has been moved.' ) }</h2>
			</div>
		</div>
	</div>
);

export default withStyles( styles )( withPageView( NotFound, '404' ) );
