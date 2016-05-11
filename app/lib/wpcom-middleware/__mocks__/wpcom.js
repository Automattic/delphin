
function createMockFunctionWithResolvedPromise( rejectPromise ) {
	return jest.genMockFunction().mockImplementation( () => {
		return new Promise( ( resolve, reject ) => {
			if ( rejectPromise ) {
				return reject( new Error( ':-(' ) );
			}

			return resolve( { great_success: true } );
		} );
	} );
}

let fakeApi = {};

fakeApi.req = {
	get: createMockFunctionWithResolvedPromise(),
	post: createMockFunctionWithResolvedPromise(),
	put: createMockFunctionWithResolvedPromise( true ), // rejected promise
	delete: createMockFunctionWithResolvedPromise()
};

function FakeWPCOM() {
	return fakeApi;
}
FakeWPCOM.prototype.__replaceImpl = function replaceFakeImplementation( impl ) {
	fakeApi = impl;
};

export default FakeWPCOM;
