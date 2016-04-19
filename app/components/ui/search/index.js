// External dependencies
import debounce from 'lodash/debounce';
import i18n from 'lib/i18n';
import React from 'react';

// Internal dependencies
import SuggestionComponent from './suggestion';

let CSS = {
	heading: {
		fontFamily: 'Merriweather, Georgia, "Times New Roman", Times, serif',
		fontWeight: '100'
	},
	field: {
		fontSize: '4em',
		padding: 0,
		width: '100%'
	},
	suggestionsList: {
		listStyle: 'none',
		margin: 0,
		padding: 0
	}
};

CSS.h1 = Object.assign( {}, CSS.heading, { textAlign: 'center' } );

const Search = React.createClass( {
	componentDidMount() {
		this.debouncedFetchResults = debounce( this.fetchResults, 500 );
	},

	componentWillReceiveProps( nextProps ) {
		if ( this.props.fields.query.value !== nextProps.fields.query.value ) {
			this.debouncedFetchResults( nextProps.fields.query.value );
		}
	},

	fetchResults( query ) {
		this.props.fetchDomainSuggestions( query );
	},

	selectDomain( name ) {
		this.props.selectDomain( name );
	},

	renderResults() {
		if ( ! this.props.results ) {
			return null;
		}

		const suggestions = this.props.results.map( ( suggestion ) => (
			<SuggestionComponent
				key={ suggestion.domain_name }
				selectDomain={ this.selectDomain }
				suggestion={ suggestion } />
		) );

		return (
			<div>
				<h2 style={ CSS.heading }>{ i18n.translate( 'Suggestions' ) }</h2>
				<ul style={ CSS.suggestionsList }>
					{ suggestions }
				</ul>
			</div>
		);
	},

	render() {
		const { fields: { query } } = this.props;

		return (
			<div>
				<h1 style={ CSS.h1 }>{ i18n.translate( 'Enter a domain' ) }</h1>
				<input { ...query } style={ CSS.field } />
				{ this.renderResults() }
			</div>
		);
	}
} );

export default Search;
