// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import config from 'config';
import SearchForm from './form';
import styles from './styles.scss';
import Suggestions from './suggestions';

const Search = React.createClass( {
	propTypes: {
		fetchDomainSuggestions: PropTypes.func.isRequired,
		fields: PropTypes.object.isRequired,
		numberOfResultsToDisplay: PropTypes.number,
		redirectToCheckout: PropTypes.func.isRequired,
		redirectToSearch: PropTypes.func.isRequired,
		redirectToSignup: PropTypes.func.isRequired,
		results: PropTypes.array,
		selectDomain: PropTypes.func.isRequired,
		sort: PropTypes.string,
		user: PropTypes.object.isRequired
	},

	getDefaultProps() {
		return {
			numberOfResultsToDisplay: config( 'initial_number_of_search_results' ),
			sort: config( 'default_search_sort' )
		};
	},

	selectDomain( name ) {
		this.props.selectDomain( name );

		if ( this.props.user.isLoggedIn ) {
			this.props.redirectToCheckout();
		} else {
			this.props.redirectToSignup();
		}
	},

	showAdditionalResults() {
		this.props.redirectToSearch(
			this.props.values.query,
			this.props.numberOfResultsToDisplay + config( 'initial_number_of_search_results' ),
			this.props.sort
		);
	},

	sortChange( event ) {
		this.props.redirectToSearch( this.props.values.query, config( 'initial_number_of_search_results' ), event.target.value );
	},

	renderSortOptions() {
		const sortOptions = [
			{
				value: 'recommended',
				text: i18n.translate( 'recommended' )
			},
			{
				value: 'unique',
				text: i18n.translate( 'unique' )
			},
			{
				value: 'short',
				text: i18n.translate( 'short' )
			},
			{
				value: 'affordable',
				text: i18n.translate( 'affordable' )
			}
		];

		return (
			<select
				className={ styles.sortSelect }
				onChange={ this.sortChange }
				value={ this.props.sort }>
				{ sortOptions.map( sort => (
					<option key={ sort.value } value={ sort.value }>{ sort.text }</option>
				) ) }
			</select>
		);
	},

	render() {
		const showAdditionalResultsLink = this.props.results &&
				this.props.results.length > this.props.numberOfResultsToDisplay;

		return (
			<div>
				<SearchForm
					fetchDomainSuggestions={ this.props.fetchDomainSuggestions }
					fields={ this.props.fields }
					redirectToSearch={ this.props.redirectToSearch } />

				<div className={ styles.sort }>
					{
						i18n.translate( 'Show me {{sortOption/}} addresses for my blog:', {
							components: {
								context: 'sortOption will be one of "recommended", "unique" or "short"',
								sortOption: this.renderSortOptions()
							}
						} )
					}
				</div>

				<Suggestions
					count={ this.props.numberOfResultsToDisplay }
					results={ this.props.results }
					selectDomain={ this.selectDomain }
					sort={ this.props.sort } />

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
