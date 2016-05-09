// External dependencies
import debounce from 'lodash/debounce';
import i18n from 'lib/i18n';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
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
	},

	componentWillUnmount() {
		this.props.clearDomainSuggestions();
	},

	componentWillReceiveProps( nextProps ) {
		if ( this.props.values.query !== nextProps.values.query ) {
			this.debouncedFetchResults( nextProps.values );
		}
	},

	fetchResults( formValues ) {
		this.props.fetchDomainSuggestions( formValues.query );
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
		const { fields: { query }, handleSubmit } = this.props;

		return (
			<form onSubmit={ handleSubmit( this.fetchResults ) }>
				<h2 className={ styles.heading }>{ i18n.translate( 'Find your perfect site address.' ) }</h2>

				<input
					{ ...query }
					autoFocus
					className={ styles.field }
					placeholder={ i18n.translate( 'Type a few keywords or an address' ) } />

				{ ! this.props.results && (
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
