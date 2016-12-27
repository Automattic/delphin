// External dependencies
import intersection from 'lodash/intersection';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { bindHandlers } from 'react-bind-handlers';

// Internal dependencies
import styles from './styles.scss';
import KeywordsContainer from 'components/containers/keywords';

class SearchInput extends React.Component {
	componentWillReceiveProps( nextProps ) {
		// sync to url the keywords if they change
		const keywordValues = this.props.keywords.map( keyword => keyword.value ),
			newKeywordValues = nextProps.keywords.map( keyword => keyword.value );

		if ( keywordValues.length !== newKeywordValues.length ||
			intersection( keywordValues, newKeywordValues ).length !== keywordValues.length ) {
			nextProps.onQueryChange( newKeywordValues.join( ' ' ) );
		}
	}

	handleInputKeydown( event ) {
		if ( event.keyCode === 8 && event.target.value.length === 0 ) { // backspace
			// Stops propagation to avoid removing two letters instead of just one
			event.preventDefault();

			this.props.removeLastKeyword();
		}
	}

	handleInputChange( event ) {
		this.props.changeInput( event.target.value );
	}

	handleSubmit( event ) {
		event.preventDefault();

		this.props.submit();
	}

	render() {
		return (
			<form className={ styles.searchWrapper } onSubmit={ this.handleSubmit }>
				<KeywordsContainer />
				<input
					autoCapitalize="off"
					autoComplete="off"
					autoFocus
					ref="searchInput"
					type="text"
					className="search"
					value={ this.props.inputValue }
					placeholder={ this.props.placeholder }
					onChange={ this.handleInputChange }
					onKeyDown={ this.handleInputKeydown }
				/>
			</form>
		);
	}
}

SearchInput.propTypes = {
	changeInput: PropTypes.func.isRequired,
	inputValue: PropTypes.string.isRequired,
	keywords: PropTypes.arrayOf( PropTypes.shape( {
		value: PropTypes.string.isRequired
	} ) ).isRequired,
	placeholder: PropTypes.string.isRequired,
	removeLastKeyword: PropTypes.func.isRequired,
	submit: PropTypes.func.isRequired
};

export default withStyles( styles )( bindHandlers( SearchInput ) );
