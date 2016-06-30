// Internal dependencies
import { getPageTitle } from 'reducers/ui/page/selectors';

export const syncPageWithStore = ( store ) => {
	store.subscribe( () => {
		const title = getPageTitle( store.getState() );

		if ( document.title !== title ) {
			document.title = title;
		}
	} );
};
