
function createMockFunctionWithResolvedPromise( rejectPromise ) {
	return jest.genMockFunction().mockImplementation(() => {
		return new Promise(function(resolve, reject) {
			if ( rejectPromise ) {
				return reject();
			}

			return resolve();
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

function fakeWPCOM() {
	return fakeApi;
}
fakeWPCOM.prototype.__replaceImpl = function replaceFakeImplementation( impl ) {
	fakeApi = impl;
};

export default fakeWPCOM;