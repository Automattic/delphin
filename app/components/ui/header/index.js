// External dependencies
import classNames from 'classnames';
import defer from 'lodash/defer';
import { bindHandlers } from 'react-bind-handlers';
import { translate } from 'i18n-calypso';
import { Link } from 'react-router';
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import { getPath } from 'routes';
import { imageUrl } from 'lib/assets';
import styles from './styles.scss';

class Header extends Component {
	componentWillMount() {
		if ( process.env.BROWSER ) {
			window.document.addEventListener( 'click', this.handleDocumentClick, false );
		}
	}

	componentWillUnmount() {
		if ( process.env.BROWSER ) {
			window.document.removeEventListener( 'click', this.handleDocumentClick, false );
		}
	}

	handleDocumentClick( event ) {
		const { enableFlag, isMenuVisible } = this.props;

		if ( isMenuVisible && ! ReactDOM.findDOMNode( this ).contains( event.target ) ) {
			enableFlag( 'headerMenu' );
		}
	}

	handleClickSettingsIcon( event ) {
		event.preventDefault();

		const { disableFlag, enableFlag, isMenuVisible } = this.props;

		if ( isMenuVisible ) {
			disableFlag( 'headerMenu' );
		} else {
			enableFlag( 'headerMenu' );
		}
	}

	handleClickLogOut( event ) {
		event.preventDefault();

		const {
			logoutUser,
			disableFlag,
			addNotice,
		} = this.props;

		logoutUser();

		disableFlag( 'headerMenu' );

		defer( () => {
			// `defer` is needed so that the route change triggered by logout
			// happens before the notice is displayed. Otherwise, the notice is
			// immediately hidden.
			addNotice( {
				status: 'success',
				message: translate( 'You have been logged out.' )
			} );
		} );
	}

	render() {
		const {
			isExcluded,
			isLoggedIn,
			isMenuVisible,
		} = this.props;

		if ( isExcluded ) {
			return null;
		}

		return (
			<header className={ styles.header }>
				<Link className={ styles.logo } to={ getPath( 'home' ) }>
					<img alt="get.blog" src={ imageUrl( 'get-dot-blog-logo-dark.svg' ) } />
				</Link>
				<div className={ styles.links }>
					{ isLoggedIn && (
						<Link className={ styles.myDomainsLink } to={ getPath( 'myDomains' ) }>
							{ translate( 'My Domains' ) }
						</Link>
					) }

					{ ! isLoggedIn && (
						<Link className={ styles.myDomainsLink } to={ getPath( 'loginUser' ) }>
							{ translate( 'Log In' ) }
						</Link>
					) }

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
	disableFlag: PropTypes.func.isRequired,
	enableFlag: PropTypes.func.isRequired,
	isExcluded: PropTypes.bool.isRequired,
	isLoggedIn: PropTypes.bool.isRequired,
	isMenuVisible: PropTypes.bool.isRequired,
	logoutUser: PropTypes.func.isRequired,
};

export default withStyles( styles )( bindHandlers( Header ) );
