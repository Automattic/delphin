// External dependencies
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { destroy } from 'redux-form';
import { push } from 'react-router-redux';

// Internal dependencies
import { fetchMyDomains } from 'actions/my-domains';
import { getPath } from 'routes';
import { isLoggedOut } from 'reducers/user/selectors';
import MyDomains from 'components/ui/my-domains';

const setupForms = [
	'connectNewBlogToOther',
	'contactConcierge',
	'contactUsExistingBlog',
	'findExistingBlog',
	'selectBlogType',
	'selectNewBlogHost',
	'selectNewBlogNeeds',
];

export default connect(
	state => ( {
		domains: state.user.myDomains,
		isRequesting: state.domainSearch.isRequesting,
		isLoggedOut: isLoggedOut( state )
	} ),
	dispatch => (
		Object.assign( {
			destroySetupForms: () => setupForms.forEach( form => dispatch( destroy( form ) ) )
		}, bindActionCreators( {
			fetchMyDomains,
			redirectToHome: () => push( getPath( 'home' ) ),
		}, dispatch ) )
	)
)( MyDomains );
