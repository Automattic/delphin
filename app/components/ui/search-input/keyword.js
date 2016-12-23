// External dependencies
import classNames from 'classnames';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { bindHandlers } from 'react-bind-handlers';

// Internal dependencies
import { isDomain } from 'lib/domains';
import styles from './styles.scss';

class Keyword extends React.Component {
	handleRemoveClick( event ) {
		this.props.remove( this.props.keyword );

		event.stopPropagation();
	}

	render() {
		const { keyword } = this.props,
			keywordIsDomain = isDomain( keyword.value ),
			keywordClassName = classNames( styles.keyword, {
				[ styles.keywordIsDomain ]: keywordIsDomain
			} );

		return (
			<li
				className={ keywordClassName }
				onClick={ this.handleRemoveClick }>
				{ keyword.value }
				<span
					className={ styles.keywordAction + ' ' + styles.keywordDelete } />
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
