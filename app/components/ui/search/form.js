// External dependencies
import debounce from 'lodash/debounce';
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

const SearchForm = React.createClass( {
	propTypes: {
		fetchDomainSuggestions: PropTypes.func.isRequired,
		fields: PropTypes.object.isRequired,
		redirectToSearch: PropTypes.func.isRequired
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

	render() {
		const { fields: { query } } = this.props;

		return (
			<input
				{ ...query }
				autoFocus
				className={ styles.field }
				placeholder={ i18n.translate( 'Type a few keywords or an address' ) } />
		);
	}
} );

export default withStyles( styles )( SearchForm );
