import { selectDomain } from '../actions/index';
import { connect } from 'react-redux';
import throttle from 'lodash/throttle';
import React from 'react';
import WPCOM from 'wpcom';
import { Link } from 'react-router';

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

	selectDomain( name, event ) {
		this.props.selectDomain( name );
	},

	renderSuggestions() {
		return this.state.suggestions.map( ( suggestion ) => (
			<li key={ suggestion.domain_name }>
				<Link
					to="/checkout"
					onClick={ this.selectDomain.bind( null, suggestion.domain_name ) }>
					{ suggestion.domain_name }
				</Link>
			</li>
		) );
	},

	render() {
		return (
			<div>
				<h1>Find a domain</h1>
				<input onChange={ this.onChange } />
				<h2>Suggestions</h2>
				<ul>
					{ this.renderSuggestions() }
				</ul>
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
