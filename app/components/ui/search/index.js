// External dependencies
import debounce from 'lodash/debounce';
import i18n from 'lib/i18n';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import { getPath } from 'routes';
import styles from './styles.scss';
import Suggestion from './suggestion';

const Search = React.createClass( {
	propTypes: {
		fetchDomainSuggestions: PropTypes.func.isRequired,
		fields: PropTypes.object.isRequired,
		results: PropTypes.array,
		selectDomain: PropTypes.func.isRequired
	},

	componentDidMount() {
		this.debouncedFetchResults = debounce( this.fetchResults, 500 );

		if ( this.isSearchPage() ) {
			this.clearFormAndSuggestions();
		}
	},

	componentWillReceiveProps( nextProps ) {
		if ( nextProps.values.query && this.props.values.query !== nextProps.values.query ) {
			if ( ! this.isResultsPage( nextProps ) && nextProps.values.query.trim() !== '' ) {
				this.props.redirectToSearchResults();
			}

			this.debouncedFetchResults( nextProps.values );
		}

		if ( ! this.isSearchPage() && this.isSearchPage( nextProps ) ) {
			this.clearFormAndSuggestions();
		}
	},

	clearFormAndSuggestions() {
		this.props.clearDomainSuggestions();
		this.props.destroyForm();
	},

	fetchResults( formValues ) {
		this.props.fetchDomainSuggestions( formValues.query );
	},

	isSearchPage( props = this.props ) {
		return props.location.pathname === getPath( 'search' );
	},

	isResultsPage( props = this.props ) {
		return props.location.pathname === getPath( 'searchResults' );
	},

	selectDomain( name ) {
		this.props.selectDomain( name );
	},

	renderResults() {
		if ( ! this.props.results ) {
			return null;
		}

		const suggestions = this.props.results.map( ( suggestion ) => (
			<Suggestion
				key={ suggestion.domain_name }
				selectDomain={ this.selectDomain }
				suggestion={ suggestion } />
		) );

		return (
			<div>
				<ul className={ styles.suggestions }>
					{ suggestions }
				</ul>
			</div>
		);
	},

	render() {
		const { fields: { query }, handleSubmit, hasSearched } = this.props,
			attemptedEmptySearch = hasSearched && this.isSearchPage(),
			searchContainerClass = attemptedEmptySearch ? styles.hasAttemptedEmptySearch : '';

		return (
			<form onSubmit={ handleSubmit( this.fetchResults ) }>
				{ ! this.isResultsPage() && (
					<h2 className={ styles.heading }>{ i18n.translate( 'Find your perfect site address.' ) }</h2>
				) }

				<div className={ searchContainerClass }>
					<input
						{ ...query }
						autoFocus
						className={ styles.field }
						placeholder={ i18n.translate( 'Type a few keywords or an address' ) } />

					{ attemptedEmptySearch && (
						<div className={ styles.emptySearchNotice }>
							{ i18n.translate( "Hi there! Try something like '%(randomQuery)s'.", {
								args: { randomQuery: 'travel mom foodie' }
							} ) }
						</div>
					) }
				</div>

				{ ! this.isResultsPage() && (
					<button className={ styles.button }>
						{ i18n.translate( "Let's find an address" ) }
					</button>
				) }

				{ this.renderResults() }
			</form>
		);
	}
} );

export default withStyles( styles )( Search );
