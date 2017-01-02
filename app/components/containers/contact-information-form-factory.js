// External dependencies
import { bindActionCreators } from 'redux';
import get from 'lodash/get';
import { reduxForm } from 'redux-form';

// Internal dependencies
import ContactInformationForm from 'components/ui/contact-information-form';
import { fetchContactInformation } from 'actions/contact-information';
import { fetchStates } from 'actions/territories';
import { fetchLocation } from 'actions/location';
import { getStates } from 'reducers/territories/selectors';
import { getUserLocation, getUserSettings } from 'reducers/user/selectors';
import { inputVisibility } from 'reducers/ui/contact-information/selectors';
import { showAddress2Input, showOrganizationInput, resetInputVisibility } from 'actions/ui/contact-information';

export default formName => reduxForm(
	{
		form: formName,
		fields: [
			'email',
			'firstName',
			'lastName',
			'organization',
			'address1',
			'address2',
			'city',
			'state',
			'countryCode',
			'postalCode',
			'phone'
		],
		destroyOnUnmount: false,
		asyncValidate: ( values, dispatch, props ) => props.onValidate( values )
				.then( result => result ? undefined : 'Validation error' ) // redux-form expects undefined if no error
				.catch( error => error.message === 'Validation error' // redux-form expects the errors to be the rejections reason
					? Promise.reject( error.validationErrors )
					: Promise.reject( error )
				)
	},
	state => ( {
		contactInformation: state.contactInformation,
		inputVisibility: inputVisibility( state ),
		userLocation: getUserLocation( state ),
		states: getStates( state, get( state, `form.${ formName }.countryCode.value` ) ),
		initialEmail: getUserSettings( state ).data.email
	} ),
	dispatch => (
		bindActionCreators( {
			fetchContactInformation,
			fetchLocation,
			fetchStates,
			showAddress2Input,
			showOrganizationInput,
			resetInputVisibility
		}, dispatch )
	)
)( ContactInformationForm );
