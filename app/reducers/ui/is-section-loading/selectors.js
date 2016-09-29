// External dependencies
import some from 'lodash/some';

export const isAnySectionLoading = state => some( state.ui.isSectionLoading );
