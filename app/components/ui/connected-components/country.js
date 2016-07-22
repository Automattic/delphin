// External dependencies
import { connect } from 'react-redux';
import React, { PropTypes } from 'react';

// Internal dependencies
import Country from 'components/ui/form/country';
import { fetchCountries } from 'actions/territories';
import { getCountries } from 'reducers/territories/selectors';

const CountryWrapper = React.createClass( {
	propTypes: {
		countries: PropTypes.object.isRequired,
		fetchCountries: PropTypes.func.isRequired
	},

	isDataLoading() {
		return ! this.props.countries.isRequesting && ! this.props.countries.hasLoadedFromServer;
	},

	componentWillMount() {
		if ( this.isDataLoading() ) {
			this.props.fetchCountries();
		}
	},

	render() {
		return <Country disabled={ this.isDataLoading() } { ...this.props }/>;
	}
} );

export default connect(
	state => ( {
		countries: getCountries( state )
	} ),
	{
		fetchCountries
	}
)( CountryWrapper );
