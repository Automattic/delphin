// External dependencies
import { push } from 'react-router-redux';
import { reduxForm, change } from 'redux-form';

// Internal dependencies
import { fetchDomainSuggestions } from 'actions/domain-suggestions';
import { selectDomain, submitEmptySearch } from 'actions/domain-search';
import { getPath } from 'routes';
import Home from 'components/ui/home';
import { isLoggedIn } from 'reducers/user/selectors';

export default reduxForm(
	{
		form: 'search',
		fields: [ 'query' ]
	},
	state => ( {
		domainSearch: state.domainSuggestions,
		showEmptySearchNotice: state.ui.domainSearch.showEmptySearchNotice,
		isLoggedIn: isLoggedIn( state )
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

		selectDomain( domainProduct, isUserLoggedIn ) {
			dispatch( selectDomain( domainProduct ) );

			if ( isUserLoggedIn ) {
				dispatch( push( getPath( 'contactInformation' ) ) );
			} else {
				dispatch( push( getPath( 'signupUser' ) ) );
			}
		}
	} ),
	( stateProps, dispatchProps, ownProps ) => Object.assign( {}, stateProps, dispatchProps, ownProps, {
		selectDomain( domainProduct ) {
			dispatchProps.selectDomain( domainProduct, stateProps.isLoggedIn );
		}
	} )
)( Home );
