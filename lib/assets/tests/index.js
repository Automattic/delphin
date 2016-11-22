/**
 * Internal dependencies
 */
import { imageUrl } from 'lib/assets';

describe( 'assets', () => {
	describe( '#imageUrl', () => {
		it( 'should prepend development image url to the image path when default env passed', () => {
			const imagePath = 'test-image.svg';

			const result = imageUrl( imagePath );

			expect( result ).toEqual( '/images/test-image.svg' )
		} );


		it( 'should prepend production image url to the image path when production env passed', () => {
			const imagePath = 'test-image.svg';

			const result = imageUrl( imagePath, 'production' );

			expect( result ).toEqual( 'https://s0.wp.com/wp-content/themes/a8c/getdotblog/public/images/test-image.svg' )
		} );
	} )
} );
