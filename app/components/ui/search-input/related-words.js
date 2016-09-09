// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import { shouldTranslateWord } from 'lib/translate';
import styles from './styles.scss';
import RelatedWord from './related-word';

const RelatedWords = ( { target, replace, relatedWords } ) => {
	if ( ! relatedWords ) {
		return null;
	}

	const showRelatedWords = relatedWords.hasLoadedFromServer && relatedWords.data.length > 0,
		isGoogleTranslateAttributionVisible = shouldTranslateWord( relatedWords.word ) && showRelatedWords,
		{ isRequesting } = relatedWords;

	return (
		<div className={ styles.relatedWords }>
			{ showRelatedWords && (
				<div>
					<h3>
						{ i18n.translate( 'Try one of these instead of {{keyword/}}:', {
							components: {
								context: 'keyword is a word a user entered to which we will display related words to follow',
								keyword: <strong>{ target.value }</strong>
							}
						} ) }
					</h3>

					<ul className={ styles.relatedWordsList }>
						{ relatedWords.data.map( word => (
							<RelatedWord key={ word } word={ word } onClick={ replace } />
						) ) }

						{ isGoogleTranslateAttributionVisible && (
							<li className={ styles.googleTranslateAttribution }>
								<img src="/images/powered-by-google-translate.png" height={ 18 } width={ 175 } alt="Google Translate"/>
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
};

RelatedWords.propTypes = {
	relatedWords: PropTypes.object,
	replace: PropTypes.func.isRequired,
	target: PropTypes.shape( {
		value: PropTypes.string.isRequired,
		isSelected: PropTypes.bool.isRequired
	} ).isRequired
};

export default withStyles( styles )( RelatedWords );
