// External dependencies
import debounce from 'lodash/debounce';
import i18n from 'i18n-calypso';
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

	componentWillReceiveProps( nextProps ) {
		if ( this.props.fields.query.value !== nextProps.fields.query.value ) {
			this.debouncedFetchResults( nextProps.fields.query.value );
		}
	},

	fetchResults( query ) {
		this.props.redirectToSearch( query );
		this.props.fetchDomainSuggestions( query );
	},

	selectDomain( name ) {
		this.props.selectDomain( name );

		if ( this.props.user.isLoggedIn ) {
			this.props.redirectToCheckout();
		} else {
			this.props.redirectToSignup();
		}
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
				<input
					{ ...query }
					autoFocus
					className={ styles.field }
					placeholder={ i18n.translate( 'Type a few keywords or an address' ) } />

				{ this.renderResults() }
			</div>
		);
	}
} );

export default withStyles( styles )( Search );
