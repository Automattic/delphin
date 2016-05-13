// External dependencies
import debounce from 'lodash/debounce';
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import config from 'config';
import styles from './styles.scss';
import Suggestion from './suggestion';

const Search = React.createClass( {
	propTypes: {
		fetchDomainSuggestions: PropTypes.func.isRequired,
		fields: PropTypes.object.isRequired,
		results: PropTypes.array,
		selectDomain: PropTypes.func.isRequired,
		numberOfResultsToDisplay: PropTypes.number
	},

	getDefaultProps() {
		return { numberOfResultsToDisplay: config( 'initial_number_of_search_results' ) };
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
		this.props.redirectToSearch( query, this.props.numberOfResultsToDisplay );
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

	showAdditionalResults( event ) {
		event.preventDefault();

		this.props.redirectToSearch(
			this.props.values.query,
			this.props.numberOfResultsToDisplay + config( 'initial_number_of_search_results' )
		);
	},

	renderResults() {
		if ( ! this.props.results ) {
			return null;
		}

		const suggestions = this.props.results
			.slice( 0, this.props.numberOfResultsToDisplay )
			.map( ( suggestion ) => (
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
		const { fields: { query } } = this.props,
			showAdditionalResultsLink = this.props.results &&
				this.props.results.length > this.props.numberOfResultsToDisplay;

		return (
			<div>
				<input
					{ ...query }
					autoFocus
					className={ styles.field }
					placeholder={ i18n.translate( 'Type a few keywords or an address' ) } />

				{ this.renderResults() }

				{ showAdditionalResultsLink && (
					<div className={ styles.additionalResultsLinkContainer }>
						<a onClick={ this.showAdditionalResults } className={ styles.additionalResultsLink }>
							{ i18n.translate( 'Show me more' ) }
						</a>
					</div>
				) }
			</div>
		);
	}
} );

export default withStyles( styles )( Search );
