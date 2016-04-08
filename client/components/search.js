import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import React from 'react';
import WPCOM from 'wpcom';

import SuggestionComponent from './suggestion';

import { reduxForm } from 'redux-form';
import { selectDomain } from '../actions/index';

const wpcomAPI = WPCOM();

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

const Search = React.createClass( {
	getInitialState() {
		return {
			suggestions: []
		};
	},

	componentDidMount() {
		this.debouncedGetDomainSuggestions = debounce( this.getDomainSuggestions, 500 );
	},

	componentWillReceiveProps( nextProps ) {
		if ( this.props.fields.query.value !== nextProps.fields.query.value ) {
			this.debouncedFetchResults( nextProps.fields.query.value );
		}
	},

	fetchResults( query ) {
		const payload = {
			query,
			quantity: 10,
			include_wordpressdotcom: false,
		};

		wpcomAPI.req.get( '/domains/suggestions', payload, ( error, response ) => {
			if ( error ) {
				return;
			}

			this.setState( { suggestions: response || [] } );
		} );
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

	render() {
		const { fields: { query } } = this.props;

		return (
			<div>
				<h1 style={ CSS.h1 }>Find a domain</h1>
				<input { ...query } style={ CSS.field } />
				<h2 style={ CSS.heading }>Suggestions</h2>
				<ul>
					{ this.renderSuggestions() }
				</ul>
			</div>
		);
	}
} );

Search = reduxForm( {
	form: 'search',
	fields: [ 'query' ]
} )( Search );

export default connect(
	undefined,
	( dispatch ) => {
		return {
			selectDomain: name => {
				dispatch( selectDomain( name ) );
			}
		};
	}
)( Search );
