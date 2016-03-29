import { selectDomain } from '../actions/index';
import { connect } from 'react-redux';
import throttle from 'lodash/throttle';

import React from 'react';
import WPCOM from 'wpcom';

const wpcomAPI = WPCOM();

const Search = React.createClass( {
	getInitialState() {
		return {
			query: '',
			suggestions: []
		};
	},

	componentDidMount() {
		this.debouncedGetDomainSuggestions = throttle( this.getDomainSuggestions, 500 );
	},

	onChange( event ) {
		this.setState( {
			query: event.target.value
		}, this.debouncedGetDomainSuggestions );
	},

	getDomainSuggestions() {
		this.fetchDomainSuggestions( ( error, response ) => {
			this.setState( {
				suggestions: response || []
			} );
		} );
	},

	fetchDomainSuggestions( callback ) {
		const query = {
			query: this.state.query,
			quantity: 10,
			include_wordpressdotcom: false,
		};

		wpcomAPI.req.get( '/domains/suggestions', query, function( error, response ) {
			if ( error ) {
				return callback( error );
			}

			return callback( null, response );
		} );
	},

	selectDomain( event ) {
		this.props.selectDomain( 'test' );
	},

	renderSuggestions() {
		return this.state.suggestions.map( ( suggestion ) => (
			<a href="#" onClick={ this.selectDomain } key={ suggestion.domain_name }>{ suggestion.domain_name }</a>
		) );
	},

	render() {
		return (
			<div>
				<h1>Find a domain</h1>
				<input onChange={ this.onChange } />
				<h2>Suggestions</h2>
				{ this.renderSuggestions() }
			</div>
		);

	}
} );

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
