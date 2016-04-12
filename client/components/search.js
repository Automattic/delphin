import { selectDomain } from '../actions/index';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import React from 'react';
import WPCOM from 'wpcom';
import { Link } from 'react-router';

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
			query: '',
			suggestions: []
		};
	},

	componentDidMount() {
		this.debouncedGetDomainSuggestions = debounce( this.getDomainSuggestions, 500 );
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

	selectDomain( name ) {
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
				<h1 style={ CSS.h1 }>Find a domain</h1>
				<input onChange={ this.onChange } style={ CSS.field } />
				<h2 style={ CSS.heading }>Suggestions</h2>
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
