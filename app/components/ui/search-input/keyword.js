// External dependencies
import classNames from 'classnames';
import find from 'lodash/find';
import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { bindHandlers } from 'react-bind-handlers';

// Internal dependencies
import { isDomain } from 'lib/domains';
import RelatedWords from './related-words';
import styles from './styles.scss';

class Keyword extends React.Component {
	handleRemoveClick( event ) {
		this.props.remove( this.props.keyword );

		event.stopPropagation();
	}

	handleKeywordClick() {
		this.props.toggleSelect( this.props.keyword );
	}

	render() {
		const { keyword, relatedWords } = this.props,
			keywordIsDomain = isDomain( keyword.value ),
			keywordClassName = classNames( styles.keyword, {
				[ styles.keywordIsSelected ]: keyword.isSelected,
				[ styles.keywordIsDomain ]: keywordIsDomain
			} );

		const relatedWordsForSelectedKeyword = keyword.isSelected ? find( relatedWords, { word: keyword.value } ) : undefined;

		return (
			<li
				className={ keywordClassName }
				onClick={ this.handleKeywordClick }>
				{ keyword.value }
				{ keyword.isSelected && (
					<span
						className={ styles.keywordAction + ' ' + styles.keywordDelete }
						onClick={ this.handleRemoveClick } />
				) }
				<ReactCSSTransitionGroup
					transitionName={ styles.relatedWords }
					transitionEnterTimeout={ 200 }
					transitionLeaveTimeout={ 200 }>
					{ keyword.isSelected && (
						<RelatedWords
							relatedWords={ relatedWordsForSelectedKeyword }
							target={ keyword }
							replace={ this.props.replace } />
					) }
				</ReactCSSTransitionGroup>
				{ ! keyword.isSelected && ! keywordIsDomain && (
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
	} ).isRequired,
	relatedWords: PropTypes.array.isRequired,
	remove: PropTypes.func.isRequired,
	replace: PropTypes.func.isRequired,
	toggleSelect: PropTypes.func.isRequired
};

export default withStyles( styles )( bindHandlers( Keyword ) );
