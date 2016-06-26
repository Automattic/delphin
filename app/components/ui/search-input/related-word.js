// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { bindHandlers } from 'react-bind-handlers';

// Internal dependencies
import styles from './styles.scss';

class RelatedWord extends React.Component {
	handleClick() {
		this.props.onClick( this.props.word );
	}

	render() {
		const { word } = this.props;
		return <li className={ styles.relatedWordsListItem } onClick={ this.handleClick }>{ word }</li>;
	}
}

RelatedWord.propTypes = {
	onClick: PropTypes.func.isRequired,
	word: PropTypes.string.isRequired
};

export default withStyles( styles )( bindHandlers( RelatedWord ) );
