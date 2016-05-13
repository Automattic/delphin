// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import config from 'config';
import styles from './styles.scss';
import Suggestions from './suggestions';

const Search = React.createClass( {
	propTypes: {
		numberOfResultsToDisplay: PropTypes.number,
		redirectToCheckout: PropTypes.func.isRequired,
		redirectToSearch: PropTypes.func.isRequired,
		redirectToSignup: PropTypes.func.isRequired,
		results: PropTypes.array,
		selectDomain: PropTypes.func.isRequired,
		user: PropTypes.object.isRequired
	},

	getDefaultProps() {
		return { numberOfResultsToDisplay: config( 'initial_number_of_search_results' ) };
	},

	selectDomain( name ) {
		this.props.selectDomain( name );

		if ( this.props.user.isLoggedIn ) {
			this.props.redirectToCheckout();
		} else {
			this.props.redirectToSignup();
		}
	},

	showAdditionalResults() {
		this.props.redirectToSearch(
			this.props.fields.query.value,
			this.props.numberOfResultsToDisplay + config( 'initial_number_of_search_results' )
		);
	},

	render() {
		const showAdditionalResultsLink = this.props.results &&
				this.props.results.length > this.props.numberOfResultsToDisplay;

		return (
			<div>
				<Suggestions
					count={ this.props.numberOfResultsToDisplay }
					results={ this.props.results }
					selectDomain={ this.selectDomain } />

				{ showAdditionalResultsLink && (
					<div className={ styles.additionalResultsLinkContainer }>
						<a onClick={ this.showAdditionalResults } className={ styles.additionalResultsLink }>
							{ i18n.translate( 'Show me more' ) }
						</a>
					</div>
				) }
			</div>
		);
	}
} );

export default withStyles( styles )( Search );
