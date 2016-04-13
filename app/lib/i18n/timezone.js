/**
 * External dependencies
 */
import jstz from 'jstimezonedetect';

/**
 * Detect and return the current timezone of the browser
 *
 * @return {String} timezone
 */
export default function timezone() {
	var detected = jstz.determine();
	return detected ? detected.name() : null;
}
