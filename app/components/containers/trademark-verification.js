// External dependencies
import { change, reduxForm } from 'redux-form';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';

// Internal dependencies
import TrademarkVerification from 'components/ui/trademark-verification';
import { getPath } from 'routes';
import { selectDomain } from 'actions/domain-search';

export default reduxForm(
	{
		form: 'trademarkVerification',
		fields: [ 'smd' ],
		destroyOnUnmount: false
	},
	null,
	dispatch => bindActionCreators( {
		changeSmd: ( value ) => change( 'trademarkVerification', 'smd', value ),
		redirect: pathSlug => thunkDispatch => {
			thunkDispatch( selectDomain( { domain_name: 'yurys-movies.storage', cost: '$123' } ) );
			return thunkDispatch( push( getPath( pathSlug ) ) );
		}
	}, dispatch )
)( TrademarkVerification );
