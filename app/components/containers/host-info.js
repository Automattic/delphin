// External dependencies
import { bindActionCreators } from 'redux';
import capitalize from 'lodash/capitalize';
import { connect } from 'react-redux';

// Internal dependencies
import { getPath } from 'routes';
import HostInfo from 'components/ui/host-info';
import { recordPageView } from 'actions/analytics';

export default connect(
	( state, ownProps ) => ( {
		domainName: ownProps.params.domainName,
		slug: ownProps.params.slug,
	} ),
	dispatch => bindActionCreators( {
		recordPageView
	}, dispatch ),
	( stateProps, dispatchProps, ownProps ) => Object.assign( {}, stateProps, dispatchProps, ownProps, {
		recordPageView() {
			const { domainName, slug } = stateProps;

			dispatchProps.recordPageView( getPath( 'hostInfo', { domainName, slug } ), `Host Info (${ capitalize( slug ) })` );
		}
	} )
)( HostInfo );
