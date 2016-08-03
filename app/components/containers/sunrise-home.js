// External dependencies
import { bindActionCreators } from 'redux';
import i18n from 'i18n-calypso';
import { push } from 'react-router-redux';
import { reduxForm } from 'redux-form';

// Internal dependencies
import { fetchDomainPrice } from 'actions/domain-price';
import { getAsyncValidateFunction } from 'lib/form';
import { getPath } from 'routes';
import { isDomain } from 'lib/domains';
import { isRequestingDomainPrice } from 'reducers/checkout/selectors';
import { selectDomain } from 'actions/domain-search';
import SunriseHome from 'components/ui/sunrise-home';

const validate = values => {
	let { query } = values;

	query = query.trim();
	query = query.replace( /\.blog$/gi, '' );

	if ( query === '' ) {
		return { query: i18n.translate( 'Please enter a domain name' ) };
	}

	if ( query.length < 4 ) {
		return { query: i18n.translate( 'Choose a longer domain, at least four characters.' ) };
	}

	if ( query.length > 63 ) {
		return { query: i18n.translate( 'Choose a shorter domain, up to 63 characters (not including the ".blog" part)' ) };
	}

	if ( query.charAt( 0 ) === '-' ) {
		return { query: i18n.translate( 'Don’t use a "-" (dash) as the first character in your domain.' ) };
	}

	if ( query.charAt( query.length - 1 ) === '-' ) {
		return { query: i18n.translate( 'Don’t use a "-" (dash) as the last character in your domain.' ) };
	}

	if ( query.indexOf( '.' ) > -1 ) {
		return { query: i18n.translate( 'Don’t use a "." (period) in your domain.' ) };
	}

	if ( ! isDomain( query + '.blog' ) ) {
		return { query: i18n.translate( 'Use only lowercase letters, numbers, and dashes (a to z, 0 to 9, and -). Spaces or other characters are not supported.' ) };
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
		fetchDomainPrice,
		selectDomain,
		redirectToConfirmDomain: () => push( getPath( 'confirmDomain' ) )
	}, dispatch )
)( SunriseHome );
