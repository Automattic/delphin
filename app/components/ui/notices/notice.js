// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import i18n from 'lib/i18n';
import styles from './styles.scss';

const Notice = React.createClass( {
	propTypes: {
		clearNotice: PropTypes.func.isRequired,
		index: PropTypes.number.isRequired,
		notice: PropTypes.object.isRequired
	},

	clear() {
		this.props.clearNotice( this.props.index );
	},

	render() {
		return (
			<div className={ styles.notice }>
				{ this.props.notice.message }
				<span className={ styles.clear } onClick={ this.clear }>
					{ i18n.translate( 'Hide' ) }
				</span>
			</div>
		);
	}
} );

export default withStyles( styles )( Notice );
