// External dependencies
import { connect } from 'react-redux';
import React, { PropTypes } from 'react';

// Internal dependencies
import Country from 'components/ui/form/country';
import { fetchCountries } from 'actions/territories';
import { getCountriesSupportedByDomains } from 'reducers/territories/selectors';

class CountryContainer extends React.Component {
	isDataLoading() {
		return ! this.props.countries.isRequesting && ! this.props.countries.hasLoadedFromServer;
	}

	componentWillMount() {
		if ( this.isDataLoading() ) {
			this.props.fetchCountries();
		}
	}

	render() {
		return <Country disabled={ this.isDataLoading() } { ...this.props }/>;
	}
}

CountryContainer.propTypes = {
	countries: PropTypes.object.isRequired,
	fetchCountries: PropTypes.func.isRequired
};

export default connect(
	state => ( {
		countries: getCountriesSupportedByDomains( state )
	} ),
	{
		fetchCountries
	}
)( CountryContainer );
