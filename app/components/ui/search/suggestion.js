// External dependencies
import { Link } from 'react-router';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import { getPath } from 'routes';
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
				<Link
					className={ styles.suggestion }
					to={ getPath( 'checkout' ) }
					onClick={ this.selectDomain }>
					{ this.props.suggestion.domain_name }
				</Link>
			</li>
		);
	}
} );

export default withStyles( styles )( Suggestion );
