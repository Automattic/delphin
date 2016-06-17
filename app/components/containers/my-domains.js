// External dependencies
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

// Internal dependencies
import { fetchMyDomains } from 'actions/my-domains';
import { isLoggedIn } from 'reducers/user/selectors';
import MyDomains from 'components/ui/my-domains';

export default connect(
	( state, ownProps ) => ( {
		isRequesting: state.domainSearch.isRequesting,
		isLoggedIn: isLoggedIn( state ),
		domains: state.user.myDomains
	} ),
	( dispatch, ownProps ) => ( {
		fetchMyDomains() {
			dispatch( fetchMyDomains() );
			setTimeout( function() {
				dispatch( {
					type: 'MY_DOMAINS_FETCH_COMPLETE',
					results: [
						{
							domain_name: 'helloworld.live'
						},
						{
							domain_name: 'foobar.live'
						},
						{
							domain_name: 'ilovepoetry.live'
						}
					]
				} );
			} );
		}
	} ),
	( stateProps, dispatchProps ) => Object.assign( {}, stateProps, dispatchProps, {
		fetchMyDomains() {
			dispatchProps.fetchMyDomains();
		}
	} )
)( MyDomains );
