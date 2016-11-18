// External dependencies
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

// Internal dependencies
import { fetchMyDomains } from 'actions/my-domains';
import { getPath } from 'routes';
import { isLoggedOut } from 'reducers/user/selectors';
import MyDomains from 'components/ui/my-domains';

export default connect(
	state => ( {
		domains: state.user.myDomains,
		isRequesting: state.domainSearch.isRequesting,
		isLoggedOut: isLoggedOut( state )
	} ),
	dispatch => (
		bindActionCreators( {
			fetchMyDomains,
			redirectToHome: () => push( getPath( 'home' ) )
		}, dispatch )
	)
)( MyDomains );
