// External dependencies
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Internal dependencies
import { hideSelect, showSelect } from 'actions/language-picker';
import LanguagePicker from 'components/ui/language-picker';
import { isSelectVisible } from 'reducers/ui/language-picker/selectors';
import { switchLocale } from 'actions/i18n';
import { withAnalytics, recordTracksEvent } from 'actions/analytics';

export default connect(
	state => ( { isSelectVisible: isSelectVisible( state ) } ),
	dispatch => bindActionCreators( {
		hideSelect,
		showSelect,
		switchLocale: withAnalytics(
			locale => recordTracksEvent( 'delphin_locale_switch', { locale: locale } ),
			switchLocale
		),
	}, dispatch )
)( LanguagePicker );
