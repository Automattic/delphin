// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { bindHandlers } from 'react-bind-handlers';
const Gridicon = require( '@automattic/dops-components/client/components/gridicon' );

// Internal dependencies
import styles from './styles.scss';

class Keyword extends React.Component {
	handleRemoveClick( event ) {
		this.props.remove( this.props.keyword );

		event.stopPropagation();
	}

	render() {
		const { keyword } = this.props;

		return (
			<li className={ styles.keyword } onClick={ this.handleRemoveClick }>
				{ keyword.value }

				<span className={ styles.keywordAction } />

				<Gridicon
					className={ styles.keywordDeleteIcon }
					icon="cross"
					size={ 20 } />
			</li>
		);
	}
}

Keyword.propTypes = {
	keyword: PropTypes.shape( {
		value: PropTypes.string.isRequired,
	} ).isRequired,
	remove: PropTypes.func.isRequired,
};

export default withStyles( styles )( bindHandlers( Keyword ) );
