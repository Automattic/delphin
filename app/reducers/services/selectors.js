export const isRequestingService = state => state.services.some( service => service.isRequesting );
