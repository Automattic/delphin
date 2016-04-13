import debounce from 'lodash/debounce';
import React from 'react';

import SuggestionComponent from './suggestion';
import { reduxForm } from 'redux-form';
import { fetchDomainSuggestions, selectDomain } from 'actions';

const CSS = {
	heading: {
		fontFamily: 'Helvetica Neue',
		fontWeight: '100'
	},
	field: {
		fontSize: '4em',
		width: '100%'
	}
};

CSS.h1 = Object.assign( {}, CSS.heading, { textAlign: 'center' } );

let Search = React.createClass( {
	getInitialState() {
		return {
			suggestions: []
		};
	},

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

	renderSuggestions() {
		return this.state.suggestions.map( ( suggestion ) => (
			<SuggestionComponent
				key={ suggestion.domain_name }
				selectDomain={ this.selectDomain }
				suggestion={ suggestion } />
		) );
	},

	renderResults() {
		if ( ! this.props.results ) {
			return null;
		}

		return this.props.results.map( ( suggestion ) => (
			<SuggestionComponent
				key={ suggestion.domain_name }
				selectDomain={ this.selectDomain }
				suggestion={ suggestion } />
		) );
	},

	render() {
		const { fields: { query } } = this.props;

		return (
			<div>
				<h1 style={ CSS.h1 }>Find a domain</h1>
				<input { ...query } style={ CSS.field } />
				<h2 style={ CSS.heading }>Suggestions</h2>
				<ul>
					{ this.renderResults() }
				</ul>
			</div>
		);
	}
} );

export default reduxForm(
	{
		form: 'search',
		fields: [ 'query' ]
	},
	state => ( { results: state.domainSearch.results } ),
	dispatch => {
		return {
			fetchDomainSuggestions: query => {
				dispatch( fetchDomainSuggestions( query ) );
			},
			selectDomain: name => {
				dispatch( selectDomain( name ) );
			}
		};
	}
)( Search );
