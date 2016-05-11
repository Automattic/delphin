// External dependencies
import { push } from 'react-router-redux';
import { reduxForm } from 'redux-form';

// Internal dependencies
import { fetchDomainSuggestions, selectDomain } from 'actions/domain-search';
import { getPath } from 'routes';
import Search from 'components/ui/search';

const initialNumberOfResultsToDisplay = 6;

export default reduxForm(
	{
		form: 'search',
		fields: [ 'query' ]
	},
	( state, ownProps ) => ( {
		results: state.domainSearch.results,
		initialValues: { query: ownProps.location.query.q },
		user: state.user,
		numberOfResultsToDisplay: Number( ownProps.location.query.r ) || undefined
	} ),
	( dispatch, ownProps ) => ( {
		fetchDomainSuggestions( query ) {
			dispatch( fetchDomainSuggestions( query ) );
		},
		redirectToCheckout() {
			dispatch( push( getPath( 'checkout' ) ) );
		},
		redirectToSearch( query, numberOfResultsToDisplay ) {
			if ( query !== ownProps.location.query.q || initialNumberOfResultsToDisplay === numberOfResultsToDisplay ) {
				// reset the result count when the query changes and hide it from the url if it is the default
				numberOfResultsToDisplay = undefined;
			}

			dispatch( push( {
				pathname: getPath( 'search' ),
				query: { q: query, r: numberOfResultsToDisplay }
			} ) );
		},
		redirectToSignup() {
			dispatch( push( getPath( 'signupUser' ) ) );
		},
		selectDomain( name ) {
			dispatch( selectDomain( name ) );
		}
	} )
)( Search );
