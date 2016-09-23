// External dependencies
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Internal dependencies
import { fetchMyDomains } from 'actions/my-domains';
import { getSelectedDomain, hasSelectedDomain } from 'reducers/checkout/selectors';
import { getUserSettings } from 'reducers/user/selectors';
import Success from 'components/ui/success';
import { redirect } from 'actions/routes';

export default connect(
	state => ( {
		domain: getSelectedDomain( state ).domainName,
		email: hasSelectedDomain( state ) ? getUserSettings( state ).data.email : null,
		hasSelectedDomain: hasSelectedDomain( state ),
	} ),
	dispatch => bindActionCreators( {
		fetchMyDomains,
		redirect
	}, dispatch )
)( Success );
