// External dependencies
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { reduxForm } from 'redux-form';

// Internal dependencies
import { fetchDomainPrice } from 'actions/domain-price';
import { withAnalytics, recordTracksEvent } from 'actions/analytics';
import { getAsyncValidateFunction } from 'lib/form';
import { getPath } from 'routes';
import { selectDomain } from 'actions/domain-search';
import { validateDomain } from 'lib/domains';
import SunriseHome from 'components/ui/sunrise-home';

// validate input value if present or query string query if present
const validate = ( values, dispatch, props ) => validateDomain( values.query || props.location.query.query );

export default reduxForm(
	{
		form: 'sunrise-home',
		fields: [ 'query' ],
		asyncValidate: getAsyncValidateFunction( validate )
	},
	( state, ownProps ) => ( {
		confirmDomainPath: getPath( 'confirmDomain' ),
		initialValues: ownProps.location.query
	} ),
	dispatch => bindActionCreators( {
		fetchDomainPrice: withAnalytics(
			domain => recordTracksEvent( 'delphin_domain_search', { search_string: domain } ),
			fetchDomainPrice
		),
		selectDomain,
		redirectToConfirmDomain: () => push( getPath( 'confirmDomain' ) )
	}, dispatch )
)( SunriseHome );
