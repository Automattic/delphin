// External dependencies
import i18n from 'i18n-calypso';
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

const explanations = [
	{
		title: i18n.translate( 'Trademark Check' ),
		text: i18n.translate( "If you're applying for a domain containing a trademark you own, you will be able to claim it by identifying as the mark's owner. We use a service called TMCH to handle trademark claims." ),
		linkText: i18n.translate( 'Learn more about registering trademarked domains' )
	},
	{
		title: i18n.translate( 'Identification and Payment' ),
		text: i18n.translate( "Contact information and a valid payment method are required when applying for a domain. Your application fee will be refunded if you don't get your domain." ),
		linkText: i18n.translate( 'Learn more about our pricing and billing' )
	},
	{
		title: i18n.translate( 'Granting Applications' ),
		text: i18n.translate( "To offer everyone a fair chance, we'll accept applications in two stages, and multiple requests for the same domain will be handled by auction. We'll keep you posted on the status of your application." ),
		linkText: i18n.translate( 'Learn more about the launch schedule' )
	}
];

const ApplicationProcess = () => (
	<div className={ styles.applicationProcess }>
		<h2 className={ styles.heading }>{ i18n.translate( 'How does the application process work?' ) }</h2>
		<div className={ styles.headingLine } />

		<div className={ styles.explanations }>
			{ explanations.map( ( explanation, index ) => (
				<div className={ styles.explanationBlock } key={ index }>
					<div className={ styles.explanationTitle }>
						{ explanation.title }
					</div>
					<div>
						<p className={ styles.explanationText }>{ explanation.text }</p>
						<p><a href="#" className={ styles.explanationLink }>{ explanation.linkText }</a></p>
					</div>
				</div>
			) ) }
		</div>
	</div>
);

export default withStyles( styles )( ApplicationProcess );
