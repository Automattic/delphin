// External dependencies
import i18n from 'lib/i18n';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

const Home = React.createClass( {
	propTypes: {
		fields: PropTypes.object.isRequired
	},

	render() {
		const { fields: { query } } = this.props;

		return (
			<div>
				<h2 className={ styles.heading }>
					{ i18n.translate( 'Find your perfect site address.' ) }
				</h2>

				<input
					{ ...query }
					autoFocus
					className={ styles.field }
					placeholder={ i18n.translate( 'Type a few keywords or an address' ) } />

				<button className={ styles.button }>
					{ i18n.translate( "Let's find an address" ) }
				</button>
			</div>
		);
	}
} );

export default withStyles( styles )( Home );
