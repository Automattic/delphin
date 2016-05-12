// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';
import Suggestion from './suggestion';

const Suggestions = React.createClass( {
	propTypes: {
		count: PropTypes.number,
		selectDomain: PropTypes.func.isRequired,
		results: PropTypes.array
	},

	getSuggestions() {
		return this.props.results.slice( 0, this.props.count );
	},

	render() {
		if ( ! this.props.results ) {
			return null;
		}

		return (
			<ul className={ styles.suggestions }>
				{ this.getSuggestions().map( ( suggestion ) => (
					<Suggestion
						key={ suggestion.domain_name }
						selectDomain={ this.props.selectDomain }
						suggestion={ suggestion } />
				) ) }
			</ul>
		);
	}
} );

export default withStyles( styles )( Suggestions );
