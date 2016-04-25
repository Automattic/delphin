// External dependencies
import debounce from 'lodash/debounce';
import i18n from 'lib/i18n';
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';
import SuggestionComponent from './suggestion';

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
				<h2 className={ styles.suggestionsHeading }>{ i18n.translate( 'Suggestions' ) }</h2>
				<ul className={ styles.suggestionsList }>
					{ suggestions }
				</ul>
			</div>
		);
	},

	render() {
		const { fields: { query } } = this.props;

		return (
			<div>
				<h1 className={ styles.heading }>{ i18n.translate( 'Enter a domain' ) }</h1>
				<input { ...query } className={ styles.field } />
				{ this.renderResults() }
			</div>
		);
	}
} );

export default withStyles( styles )( Search );
