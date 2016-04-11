import { Link } from 'react-router';
import React from 'react';

export default React.createClass( {
	selectDomain() {
		this.props.selectDomain( this.props.suggestion.domain_name );
	},

	render() {
		return (
			<li>
				<Link
					to="/checkout"
					onClick={ this.selectDomain }>
					{ this.props.suggestion.domain_name }
				</Link>
			</li>
		);
	}
} );
