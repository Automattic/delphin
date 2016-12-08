// External dependencies
import get from 'lodash/get';

/**
 * Retrieves the type of blog being connected during a domain setup.
 *
 * @param {object} state - global state tree
 * @returns {string|null} - the type of blog, or null if not found
 */
export const getBlogType = ( state ) => {
	return get( state, 'form.selectBlogType.newOrExisting.value' );
};

/**
 * Retrieves the selected service of the blog to connect during a domain setup.
 *
 * @param {object} state - global state tree
 * @returns {string|null} - the selected service of the blog to connect, or null if not found
 */
export const getBlogNeedSelected = ( state ) => {
	return get( state, 'form.selectNewBlogNeeds.needs.value' );
};

/**
 * Retrieves the email address the user entered in the contact information form
 *
 * @param {object} state - global state tree
 * @returns {string|null} - the email address from the contact information form
 */
export const getContactInformationEmail = ( state ) => {
	return get( state, 'form.contactInformation.email.value' );
};
