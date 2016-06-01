// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

class RelatedWord extends React.Component {
	constructor( props ) {
		super( props );

		this.onClickBound = this.onClick.bind( this );
	}

	onClick() {
		this.props.onClick( this.props.word );
	}

	render() {
		const { word } = this.props;
		return <li className={ styles.relatedWordsListItem } onClick={ this.onClickBound }>{ word }</li>;
	}
}

RelatedWord.propTypes = {
	onClick: PropTypes.func.isRequired,
	word: PropTypes.string.isRequired
};

export default withStyles( styles )( RelatedWord );
