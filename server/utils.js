// External dependencies
import fs from 'fs';

export function fileExists( path ) {
	try {
		fs.accessSync( path, fs.R_OK );
		return true;
	} catch ( err ) {
		return false;
	}
}
