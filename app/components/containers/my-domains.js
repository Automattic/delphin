// External dependencies
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

// Internal dependencies
import { fetchMyDomains } from 'actions/my-domains';
import { areDomainDetailsVisible } from 'reducers/ui/my-domains/selectors';
import { getPath } from 'routes';
import { isLoggedIn } from 'reducers/user/selectors';
import MyDomains from 'components/ui/my-domains';
import { showDomainDetails, hideDomainDetails } from 'actions/ui/my-domains';

export default connect(
	state => ( {
		areDomainDetailsVisible: areDomainDetailsVisible( state ),
		domains: state.user.myDomains,
		isRequesting: state.domainSearch.isRequesting,
		isLoggedIn: isLoggedIn( state )
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
								domain_name: 'theroamingforks.com',
								is_setup: true
							},
							{
								domain_name: 'foodiewithike.com',
								is_setup: false
							},
							{
								domain_name: 'burgerburgerburgers.com',
								is_setup: true
							}
						]
					} );
				}, 2000 );
				return fetchMyDomains( domainName );
			},
			redirectToLogin: () => push( getPath( 'loginUser' ) ),
			showDomainDetails,
			hideDomainDetails
		}, dispatch )
	),
	( stateProps, dispatchProps, ownProps ) => Object.assign( {}, stateProps, dispatchProps, ownProps, {
		toggleDomainDetails( domainName ) {
			if ( stateProps.areDomainDetailsVisible( domainName ) ) {
				dispatchProps.hideDomainDetails( domainName );
			} else {
				dispatchProps.showDomainDetails( domainName );
			}
		}
	} )
)( MyDomains );
