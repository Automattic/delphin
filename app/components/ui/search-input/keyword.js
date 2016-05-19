// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';
import { isDomain } from 'lib/domains';

class Keyword extends React.Component {
	constructor( props ) {
		super( props );

		this.onRemoveClickBound = this.onRemoveClick.bind( this );
		this.onKeywordClickBound = this.onKeywordClick.bind( this );
	}

	onRemoveClick( event ) {
		this.props.remove( this.props.keyword );

		event.stopPropagation();
	}

	onKeywordClick() {
		this.props.toggleSelect( this.props.keyword );
	}

	render() {
		const { keyword } = this.props;

		const keywordIsDomain = isDomain( keyword.value );

		const keywordClassName = styles.keyword + ' ' + ( keyword.isSelected ? styles.keywordSelected : '' ) + ' ' + ( keyword.isHidden ? styles.keywordHidden : '' );
		const keywordClickHandler = keywordIsDomain ? null : this.onKeywordClickBound;

		return (
			<li
				className={ keywordClassName }
				onClick={ keywordClickHandler }>
				{ keyword.value }
				{ keywordIsDomain && (
					<span
						className={ styles.keywordAction + ' ' + styles.domainDelete }
						onClick={ this.onRemoveClickBound }>
						x
					</span>
				) }
				{ ! keywordIsDomain && keyword.isSelected && (
					<span
						className={ styles.keywordAction + ' ' + styles.keywordDelete }
						onClick={ this.onRemoveClickBound } />
				) }
				{ ! keywordIsDomain && ! keyword.isSelected && (
					<span className={ styles.keywordAction + ' ' + styles.keywordSelect } />
				) }
			</li>
		);
	}
}

Keyword.propTypes = {
	keyword: PropTypes.shape( {
		value: PropTypes.string.isRequired,
		isSelected: PropTypes.bool.isRequired
	} ).isRequired
};

export default withStyles( styles )( Keyword );
