// External dependencies
import classNames from 'classnames';
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
	handleClickSettingsIcon( event ) {
		event.preventDefault();

		const { hideToggle, showToggle, isMenuVisible } = this.props;

		if ( isMenuVisible ) {
			hideToggle( 'headerMenu' );
		} else {
			showToggle( 'headerMenu' );
		}
	}

	handleClickLogOut( event ) {
		event.preventDefault();

		const {
			logoutUser,
			hideToggle,
			redirect,
			location,
			addNotice,
		} = this.props;

		// TODO: We should use route slugs instead of paths here once we have a
		// function that can get the current route slug from the path.
		const loggedOutPaths = [
			'/',
			'/learn-more',
			'/search',
		];

		if ( loggedOutPaths.indexOf( location.pathname ) === -1 ) {
			// if users are on a page that requires login, redirect them to
			// home so they aren't automatically redirected back to the log in page
			redirect( 'home' );
		}

		hideToggle();

		logoutUser();

		addNotice( {
			status: 'success',
			message: translate( 'You have been logged out.' )
		} );
	}

	render() {
		const {
			isLoggedIn,
			isMenuVisible,
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
							<a
								className={ styles.settings }
								onClick={ this.handleClickSettingsIcon }
							>
								<span className={ styles.visuallyHidden }>Settings</span>
							</a>
							<div className={ classNames( styles.menu, { [ styles.isVisible ]: isMenuVisible } ) }>
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
	addNotice: PropTypes.func.isRequired,
	hideToggle: PropTypes.func.isRequired,
	isLoggedIn: PropTypes.bool.isRequired,
	isMenuVisible: PropTypes.bool.isRequired,
	location: PropTypes.object.isRequired,
	logoutUser: PropTypes.func.isRequired,
	redirect: PropTypes.func.isRequired,
	showToggle: PropTypes.func.isRequired,
};

export default withStyles( styles )( bindHandlers( Header ) );
