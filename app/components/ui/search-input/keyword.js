// External dependencies
import { bindHandlers } from 'react-bind-handlers';
import Gridicon from 'gridicons';
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

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
			<li className={ styles.keyword }
				onClick={ this.handleRemoveClick }
				title={ i18n.translate( 'Remove this keyword from your search' ) }>

				{ keyword.value }

				<Gridicon
					className={ styles.keywordIcon }
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
