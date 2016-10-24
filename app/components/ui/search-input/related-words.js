// External dependencies
import { bindHandlers } from 'react-bind-handlers';
import i18n from 'i18n-calypso';
import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import { imageUrl } from 'lib/assets';
import { shouldTranslateWord } from 'lib/translate';
import styles from './styles.scss';
import RelatedWord from './related-word';

class RelatedWords extends Component {
	constructor( props ) {
		super( props );

		this.saveRef = container => this.container = container;
	}

	componentDidMount() {
		window.addEventListener( 'resize', this.handleResize );

		this.handleResize();
	}

	componentWillUnmount() {
		window.removeEventListener( 'resize', this.handleResize );
	}

	handleResize() {
		// this can happen if ! relatedWords => we render null ( nothing, in case of domain keyword for example )
		if ( ! this.container ) {
			return;
		}

		const { right } = this.container.getBoundingClientRect();

		const delta = window.innerWidth - Math.round( right ) - 15;

		const left = delta + this.container.offsetLeft;

		if ( left > 0 ) {
			this.container.style.left = 0;
		} else {
			this.container.style.left = `${left}px`;
		}
	}

	render() {
		const { target, replace, relatedWords } = this.props;

		if ( ! relatedWords ) {
			return null;
		}

		const showRelatedWords = relatedWords.hasLoadedFromServer && relatedWords.data.length > 0,
			isGoogleTranslateAttributionVisible = shouldTranslateWord( relatedWords.word ) && showRelatedWords,
			{ isRequesting } = relatedWords;

		return (
			<div className={ styles.relatedWords } ref={ this.saveRef }>
				{ showRelatedWords && (
					<div>
						<h3>
							{ i18n.translate( 'Try one of these instead of {{keyword/}}:', {
								components: {
									keyword: <strong>{ target.value }</strong>
								},
								comment: 'keyword is a word a user entered to which we will display related words to follow'
							} ) }
						</h3>

						<ul className={ styles.relatedWordsList }>
							{ relatedWords.data.map( word => (
								<RelatedWord key={ word } word={ word } onClick={ replace } />
							) ) }

							{ isGoogleTranslateAttributionVisible && (
								<li className={ styles.googleTranslateAttribution }>
									<img src={ imageUrl( 'powered-by-google-translate.png' ) } height={ 18 } width={ 175 } alt="Google Translate" />
								</li>
							) }
						</ul>
					</div>
				) }

				{ ! showRelatedWords && ! isRequesting && (
					<h3>
						{ i18n.translate( 'No related words for %(word)s were found.', {
							args: { word: target.value }
						} ) }
					</h3>
				) }

				{ isRequesting && (
					<h3>{ i18n.translate( 'Loading…' ) }</h3>
				) }
			</div>
		);
	}
}

RelatedWords.propTypes = {
	relatedWords: PropTypes.object,
	replace: PropTypes.func.isRequired,
	target: PropTypes.shape( {
		value: PropTypes.string.isRequired,
		isSelected: PropTypes.bool.isRequired
	} ).isRequired
};

export default withStyles( styles )( bindHandlers( RelatedWords ) );
