// External dependencies
import i18n from 'i18n-calypso';
import randomWords from 'random-words';
import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReactDOM from 'react-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

const Home = React.createClass( {
	propTypes: {
		fields: PropTypes.object.isRequired
	},

	handleSubmit( { query } ) {
		if ( query && query.trim() !== '' ) {
			this.props.redirectToSearch( query );
		} else {
			ReactDOM.findDOMNode( this.refs.query ).focus();
		}
	},

	generateRandomQuery() {
		this.props.changeQuery( randomWords( 3 ).join( ' ' ) );
	},

	needSomeInspiration() {
		return (
			<a onClick={ this.generateRandomQuery } className={ styles.needInspiration }>
				{ i18n.translate( 'Need some inspiration?' ) }
			</a>
		);
	},

	render() {
		const { fields: { query }, handleSubmit } = this.props,
			showEmptySearchNotice = query.touched && query.error;

		return (
			<form onSubmit={ handleSubmit( this.handleSubmit ) }>
				<h2 className={ styles.heading }>
					{ i18n.translate( 'Find your perfect site address.' ) }
				</h2>

				<input
					{ ...query }
					autoComplete="off"
					autoFocus
					className={ styles.field }
					placeholder={ i18n.translate( 'Type a few keywords or a domain' ) }
					ref="query" />

				<ReactCSSTransitionGroup
					transitionName={ styles.emptySearchNotice }
					transitionEnterTimeout={ 500 }
					transitionLeaveTimeout={ 1 }>
					{ showEmptySearchNotice && (
						<div className={ styles.emptySearchNotice }>
							{ query.error }
							{ this.needSomeInspiration() }
						</div>
					) }
				</ReactCSSTransitionGroup>

				<button className={ styles.button }>
					{ i18n.translate( "Let's find an address" ) }
				</button>
			</form>
		);
	}
} );

export default withStyles( styles )( Home );
