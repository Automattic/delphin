// External dependencies
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import { push } from 'react-router-redux';
import i18n from 'i18n-calypso';

// Internal dependencies
import { fetchDomainPrice } from 'actions/domain-price';
import { withAnalytics, recordTracksEvent } from 'actions/analytics';
import { getAsyncValidateFunction } from 'lib/form';
import { getPath } from 'routes';
import { isRequestingDomainPrice } from 'reducers/checkout/selectors';
import { selectDomain } from 'actions/domain-search';
import SunriseHome from 'components/ui/sunrise-home';

const validate = values => {
	if ( ! values.query.trim() ) {
		return { query: i18n.translate( 'Please enter a domain name' ) };
	}
	return {};
};

export default reduxForm(
	{
		form: 'sunrise-home',
		fields: [ 'query' ],
		asyncValidate: getAsyncValidateFunction( validate ),

	},
	state => ( { isRequestingDomainPrice: isRequestingDomainPrice( state ) } ),
	dispatch => bindActionCreators( {
		fetchDomainPrice: withAnalytics(
			domain => recordTracksEvent( 'delphin_domain_search', { search_string: domain } ),
			fetchDomainPrice
		),
		selectDomain,
		redirectToConfirmDomain: () => push( getPath( 'confirmDomain' ) )
	}, dispatch )
)( SunriseHome );
