// External dependencies
import { destroy } from 'redux-form';

const setupForms = [
	'connectNewBlogToOther',
	'contactConcierge',
	'contactUsExistingBlog',
	'findExistingBlog',
	'selectBlogType',
	'selectNewBlogHost',
	'selectNewBlogNeeds',
];

export const destroySetupForms = () => dispatch => setupForms.forEach( form => dispatch( destroy( form ) ) );
