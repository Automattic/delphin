export function imageUrl( imagePath, env = process.env.NODE_ENV ) {
	if ( env === 'production' ) {
		return `https://s0.wp.com/wp-content/themes/a8c/getdotblog/public/images/${ imagePath }`;
	}

	return `/images/${ imagePath }`;
}
