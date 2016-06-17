// External dependencies
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Internal dependencies
import { fetchMyDomains } from 'actions/my-domains';
import { isLoggedIn } from 'reducers/user/selectors';
import MyDomains from 'components/ui/my-domains';
import { showDomainDetails, hideDomainDetails } from 'actions/ui/my-domains';

export default connect(
	state => ( {
		isRequesting: state.domainSearch.isRequesting,
		isLoggedIn: isLoggedIn( state ),
		domains: state.user.myDomains
	} ),
	dispatch => (
		bindActionCreators( {
			// TODO: should be replaced with just `fetchMyDomains` once we get real data from the server
			fetchMyDomains: ( domainName ) => {
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
				}, 2000 );
				return fetchMyDomains( domainName );
			},
			showDomainDetails,
			hideDomainDetails
		}, dispatch )
	),
	( stateProps, dispatchProps ) => Object.assign( {}, stateProps, dispatchProps, {
		fetchMyDomains() {
			dispatchProps.fetchMyDomains();
		}
	} )
)( MyDomains );
