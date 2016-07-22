// External dependencies
import { connect } from 'react-redux';
import React from 'react';

// Internal dependencies
import Country from 'components/ui/form/country';
import { fetchCountries } from 'actions/territories';
import { getCountries } from 'reducers/territories/selectors';

export default connect(
	state => ( {
		countries: getCountries( state )
	} ),
	{
		fetchCountries
	}
)( React.createClass( {
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
} ) );
