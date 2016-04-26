// External dependencies
import debounce from 'lodash/debounce';
import i18n from 'lib/i18n';
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';
import Suggestion from './suggestion';

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
		const { fields: { query } } = this.props;

		return (
			<div>
				<h2 className={ styles.heading }>{ i18n.translate( 'Find your perfect site address.' ) }</h2>

				<input
					{ ...query }
					className={ styles.field }
					placeholder={ i18n.translate( 'Type a few keywords or an address' ) } />

				{ this.renderResults() }
			</div>
		);
	}
} );

export default withStyles( styles )( Search );
