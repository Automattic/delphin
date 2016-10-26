/**
 * Internal dependencies
 */
import { imageUrl } from 'lib/assets';

describe( 'assets', () => {
	describe( '#imageUrl', () => {
		it( 'should prepend image url to the image path', () => {
			const imagePath = 'test-image.svg';

			const result = imageUrl( imagePath );

			expect( result ).toEqual( 'https://s0.wp.com/wp-content/themes/a8c/getdotblog/public/images/test-image.svg' )
		} );
	} )
} );
