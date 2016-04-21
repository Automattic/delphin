// External dependencies
import { Link } from 'react-router';
import React from 'react';

// Internal dependencies
import { getPath } from 'routes';

const Suggestion = React.createClass( {
	getInitialState() {
		return {
			hovered: false
		};
	},

	css() {
		return {
			link: {
				backgroundColor: this.state.hovered ? '#ddd' : '#eee',
				border: '1px solid #fff',
				color: '#000',
				display: 'block',
				padding: '1em',
				textDecoration: 'none'
			}
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
					to={ getPath( 'checkout' ) }
					onMouseOver={ this.onMouseOver }
					onMouseOut={ this.onMouseOut }
					onClick={ this.selectDomain }
					style={ this.css().link }>
					{ this.props.suggestion.domain_name }
				</Link>
			</li>
		);
	}
} );

export default Suggestion;
