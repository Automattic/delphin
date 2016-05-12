const createMockFunctionWithResolvedPromise = ( { rejectPromise } = { rejectPromise: false } ) => {
	return jest.genMockFunction().mockImplementation( () => {
		return new Promise( ( resolve, reject ) => {
			if ( rejectPromise ) {
				return reject( new Error( ':-(' ) );
			}

			return resolve( { great_success: true } );
		} );
	} );
};

let fakeApi = {
	req: {
		get: createMockFunctionWithResolvedPromise(),
		post: createMockFunctionWithResolvedPromise(),
		put: createMockFunctionWithResolvedPromise( { rejectPromise: true } ), // hardcoded to fail for testing
		delete: createMockFunctionWithResolvedPromise()
	}
};

function FakeWPCOM() {
	return fakeApi;
}

FakeWPCOM.prototype.__replaceImpl = function replaceFakeImplementation( impl ) {
	fakeApi = impl;
};

export default FakeWPCOM;
