// External dependencies
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

// Internal dependencies
import { fetchMyDomains } from 'actions/my-domains';
import { areDomainDetailsVisible } from 'reducers/ui/my-domains/selectors';
import { getPath } from 'routes';
import { isLoggedOut } from 'reducers/user/selectors';
import MyDomains from 'components/ui/my-domains';
import { showDomainDetails, hideDomainDetails } from 'actions/ui/my-domains';

export default connect(
	state => ( {
		areDomainDetailsVisible: areDomainDetailsVisible( state ),
		domains: state.user.myDomains,
		isRequesting: state.domainSearch.isRequesting,
		isLoggedOut: isLoggedOut( state )
	} ),
	dispatch => (
		bindActionCreators( {
			fetchMyDomains,
			redirectToHome: () => push( getPath( 'home' ) ),
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
