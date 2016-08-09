// External dependencies
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Internal dependencies
import { hideSelect, showSelect } from 'actions/language-picker';
import LanguagePicker from 'components/ui/language-picker';
import { isSelectVisible } from 'reducers/ui/language-picker/selectors';
import { switchLocale } from 'actions/i18n';

export default connect(
	state => ( { isSelectVisible: isSelectVisible( state ) } ),
	dispatch => bindActionCreators( {
		hideSelect,
		showSelect,
		switchLocale,
	}, dispatch )
)( LanguagePicker );
