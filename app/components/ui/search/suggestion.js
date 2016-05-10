// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

const Suggestion = React.createClass( {
	propTypes: {
		selectDomain: PropTypes.func.isRequired,
		suggestion: PropTypes.object.isRequired
	},

	selectDomain() {
		this.props.selectDomain( this.props.suggestion.domain_name );
	},

	render() {
		return (
			<li>
				<a
					className={ styles.suggestion }
					onClick={ this.selectDomain }>
					{ this.props.suggestion.domain_name }
				</a>
			</li>
		);
	}
} );

export default withStyles( styles )( Suggestion );
