// External dependencies

export const getMyDomainsDetailsVisibility = state => state.ui.myDomains.detailsVisibility;
export const areDomainDetailsVisible = state => domainName => !! state.ui.myDomains.detailsVisibility[ domainName ];
