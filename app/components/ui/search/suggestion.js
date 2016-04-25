// External dependencies
import { Link } from 'react-router';
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import { getPath } from 'routes';
import styles from './styles.scss';

const Suggestion = React.createClass( {
	getInitialState() {
		return {
			hovered: false
		};
	},

	selectDomain() {
		this.props.selectDomain( this.props.suggestion.domain_name );
	},

	onMouseOver() {
		this.setState( {
			hovered: true
		} );
	},

	onMouseOut() {
		this.setState( {
			hovered: false
		} );
	},

	render() {
		return (
			<li>
				<Link
					className={ styles.suggestion }
					to={ getPath( 'checkout' ) }
					onMouseOver={ this.onMouseOver }
					onMouseOut={ this.onMouseOut }
					onClick={ this.selectDomain }>
					{ this.props.suggestion.domain_name }
				</Link>
			</li>
		);
	}
} );

export default withStyles( styles )( Suggestion );
