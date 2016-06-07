// External dependencies
import { push } from 'react-router-redux';
import { reduxForm, change } from 'redux-form';

// Internal dependencies
import { fetchDomainSuggestions, selectDomain, submitEmptySearch } from 'actions/domain-search';
import { getPath } from 'routes';
import Home from 'components/ui/home';

export default reduxForm(
	{
		form: 'search',
		fields: [ 'query' ]
	},
	state => ( {
		domainSearch: state.domainSearch,
		showEmptySearchNotice: state.ui.domainSearch.showEmptySearchNotice
	} ),
	dispatch => ( {
		changeQuery( query ) {
			dispatch( change( 'search', 'query', query ) );
		},

		redirectToSearch( query ) {
			dispatch( push( {
				pathname: getPath( 'search' ),
				query: { q: query }
			} ) );
		},

		submitEmptySearch() {
			dispatch( submitEmptySearch() );
		},

		fetchDomainSuggestions( query ) {
			dispatch( fetchDomainSuggestions( query ) );
		},

		selectDomain( name, isUserLoggedIn ) {
			dispatch( selectDomain( name ) );

			if ( isUserLoggedIn ) {
				dispatch( push( getPath( 'contactInformation' ) ) );
			} else {
				dispatch( push( getPath( 'signupUser' ) ) );
			}
		}
	} ),
	( stateProps, dispatchProps, ownProps ) => Object.assign( {}, stateProps, dispatchProps, ownProps, {
		selectDomain( name ) {
			dispatchProps.selectDomain( name, stateProps.user.isLoggedIn );
		}
	} )
)( Home );
