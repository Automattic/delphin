// External dependencies
import i18n from 'i18n-calypso';
import { Link } from 'react-router';
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import Button from 'components/ui/button';
import DomainInput from 'components/ui/domain-input';
import styles from './styles.scss';

class TrademarkHome extends React.Component {
	render() {
		return (
			<div>
				<div className={ styles.headerContainer }>
					<header className={ styles.header }>
						<Link to="/" className={ styles.logo }>
							get<em>.blog</em>
						</Link>
						<h1 className={ styles.heading }>
							{ i18n.translate( 'Give your company blog a better domain' ) }
						</h1>
						<h2 className={ styles.subHeading }>
							{ i18n.translate( 'Pre-register your trademark now to secure the ' +
								'.blog domain for your company or organization.' ) }
							{ ' ' }
							{ i18n.translate( 'Sunrise phase applications are open until October 17.' ) }
						</h2>
						<div className={ styles.domainInputContainer }>
							<DomainInput className={ styles.domainInput } />
							<Button>{ i18n.translate( 'Register Trademark Domain' ) }</Button>
						</div>
					</header>
				</div>
				<div className={ styles.preRegisterDomain }>
					{ i18n.translate( "Don't own a trademark? {{a}}Pre-register a regular domain{{/a}}", {
						components: { a: <Link className={ styles.preRegisterLink } to="/" /> },
					} ) }
				</div>
			</div>
		);
	}
}

export default withStyles( styles )( TrademarkHome );
