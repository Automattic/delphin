// External dependencies
import { connect } from 'react-redux';

// Internal dependencies
import config from 'config';
import { checkDomainAvailability } from 'actions/domain-search';
import Suggestion from 'components/ui/search/suggestion';
import { redirect } from 'actions/routes';
import { recordTracksEvent } from 'actions/analytics';

export default connect(
	( state, ownProps ) => {
		console.log( state );
		return ( {
			//isAvailable: state.domainAvailability.data.results.isAvailable,
		} );
	},
	( dispatch, ownProps ) => ( {
		checkDomainAvailability( domainProduct ) {
			dispatch( checkDomainAvailability( domainProduct ) );
		},

		selectDomain( domainProduct, isUserLoggedIn ) {
			dispatch( recordTracksEvent( 'delphin_search_result_select', {
				is_premium: domainProduct.isPremium,
				relevance: domainProduct.relevance,
				num_results_shown: Number( ownProps.location.query.r ) || config( 'initial_number_of_search_results' )
			} ) );
			dispatch( selectDomain( domainProduct ) );

			if ( isUserLoggedIn ) {
				dispatch( redirect( 'contactInformation' ) );
			} else {
				dispatch( redirect( 'signupUser' ) );
			}
		}
	} ),
	( stateProps, dispatchProps, ownProps ) => Object.assign( {}, stateProps, dispatchProps, ownProps, {
		selectDomain( domainProduct ) {
			dispatchProps.selectDomain( domainProduct, stateProps.isLoggedIn );
		}
	} )
)( Suggestion );
