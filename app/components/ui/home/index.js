// External dependencies
import i18n from 'i18n-calypso';
import randomWords from 'random-words';
import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReactDOM from 'react-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import DocumentTitle from 'components/ui/document-title';
import ExperimentWarning from 'components/ui/experiment-warning';
import { isDomain, queryIsInResults } from 'lib/domains';
import styles from './styles.scss';

const Home = React.createClass( {
	propTypes: {
		changeQuery: PropTypes.func.isRequired,
		domainSearch: PropTypes.object.isRequired,
		fetchDomainSuggestions: PropTypes.func.isRequired,
		fields: PropTypes.object.isRequired,
		handleSubmit: PropTypes.func.isRequired,
		invalid: PropTypes.bool.isRequired,
		redirectToSearch: PropTypes.func.isRequired,
		selectDomain: PropTypes.func.isRequired,
		showEmptySearchNotice: PropTypes.bool.isRequired,
		submitEmptySearch: PropTypes.func.isRequired,
		submitting: PropTypes.bool.isRequired
	},

	componentWillReceiveProps( nextProps ) {
		if ( ! this.props.domainSearch.hasLoadedFromServer && nextProps.domainSearch.hasLoadedFromServer ) {
			const { results, query } = nextProps.domainSearch;

			if ( isDomain( query ) && queryIsInResults( results, query ) ) {
				const product = results.find( result => result.domain_name === query );
				this.props.selectDomain( product );
			} else {
				this.props.redirectToSearch( query );
			}
		}
	},

	handleSubmit( { query } ) {
		if ( ! query ) {
			this.props.submitEmptySearch();

			ReactDOM.findDOMNode( this.refs.query ).focus();
			return;
		}

		query = query.trim();

		if ( isDomain( query ) ) {
			this.props.fetchDomainSuggestions( query );
		} else if ( query !== '' ) {
			this.props.redirectToSearch( query );
		}
	},

	isSubmitButtonDisabled() {
		const { invalid, submitting, domainSearch: { isRequesting } } = this.props;

		return invalid || submitting || isRequesting;
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
		const { fields: { query }, handleSubmit } = this.props;

		return (
			<DocumentTitle>
				<form onSubmit={ handleSubmit( this.handleSubmit ) }>
					<ExperimentWarning />
					<h2 className={ styles.heading }>
						{ i18n.translate( 'Find your perfect site address.' ) }
					</h2>

					<input
						{ ...query }
						autoComplete="off"
						autoFocus
						className={ styles.field }
						placeholder={ i18n.translate( 'Type a few keywords or an address' ) }
						ref="query" />

					<ReactCSSTransitionGroup
						transitionName={ styles.emptySearchNotice }
						transitionEnterTimeout={ 500 }
						transitionLeaveTimeout={ 1 }>
						{ this.props.showEmptySearchNotice && (
							<div className={ styles.emptySearchNotice }>
								{ i18n.translate( "Hi there! Try something like '%(randomQuery)s'.", {
									args: { randomQuery: 'travel mom foodie' }
								} ) }
								{ this.needSomeInspiration() }
							</div>
						) }
					</ReactCSSTransitionGroup>

					<button
						disabled={ this.isSubmitButtonDisabled() }
						className={ styles.button }>
						{ i18n.translate( "Let's find an address" ) }
					</button>
				</form>
			</DocumentTitle>
		);
	}
} );

export default withStyles( styles )( Home );
