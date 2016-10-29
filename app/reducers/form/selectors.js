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
export const getBlogService = ( state ) => {
	return get( state, 'form.selectNewBlogHost.service.value' );
};
