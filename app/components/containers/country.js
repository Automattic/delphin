// External dependencies
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { PropTypes } from 'react';

// Internal dependencies
import Country from 'components/ui/form/country';
import { fetchCountries } from 'actions/territories';
import { getCountriesSupportedByCheckout, getCountriesSupportedByDomains } from 'reducers/territories/selectors';

class QueryCountries extends React.Component {
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

QueryCountries.propTypes = {
	countries: PropTypes.object.isRequired,
	fetchCountries: PropTypes.func.isRequired
};

const CountryContainer = connect(
	( state, ownProps ) => ( {
		countries: ownProps.supportedBy === 'checkout'
			? getCountriesSupportedByCheckout( state )
			: getCountriesSupportedByDomains( state ) } ),
	( dispatch, ownProps ) => bindActionCreators( {
		fetchCountries: fetchCountries.bind( null, ownProps.supportedBy )
	}, dispatch )
)( QueryCountries );

CountryContainer.propTypes = {
	supportedBy: PropTypes.string.isRequired
};

export default CountryContainer;
