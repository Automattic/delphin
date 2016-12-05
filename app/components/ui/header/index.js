// External dependencies
import { bindHandlers } from 'react-bind-handlers';
import { translate } from 'i18n-calypso';
import { Link } from 'react-router';
import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import { getPath } from 'routes';
import { imageUrl } from 'lib/assets';
import styles from './styles.scss';

class Header extends Component {
	handleClickLogOut( event ) {
		event.preventDefault();

		this.props.logoutUser();
	}

	render() {
		const {
			isLoggedIn,
		} = this.props;

		return (
			<header className={ styles.header }>
				<Link className={ styles.logo } to={ getPath( 'home' ) }>
					<img alt="get.blog" src={ imageUrl( 'get-dot-blog-logo-dark.svg' ) } />
				</Link>
				<div className={ styles.links }>
					<Link className={ styles.myDomainsLink } to={ getPath( 'myDomains' ) }>
						{ translate( 'My Domains' ) }
					</Link>
					{ isLoggedIn && (
						<span className={ styles.menuContainer }>
							<span className={ styles.settings }><span className={ styles.visuallyHidden }>Settings</span></span>
							<div className={ styles.menu }>
								<a
									className={ styles.logOutLink }
									onClick={ this.handleClickLogOut }
								>{ translate( 'Log Out' ) }</a>
							</div>
						</span>
					) }
				</div>
			</header>
		);
	}
}

Header.propTypes = {
	isLoggedIn: PropTypes.bool.isRequired,
	logoutUser: PropTypes.func.isRequired,
};

export default withStyles( styles )( bindHandlers( Header ) );
