// External dependencies
jest.unmock( 'i18n-calypso' );
import i18n from 'i18n-calypso';
import request from 'superagent';

// The tested module:
jest.unmock( '..' );
jest.unmock( 'reducers/ui/domain-search/selectors.js' );
jest.unmock( 'config' );

// Breaks jest for some reason:
// jest.unmock( 'wpcom' ); - replaced by a manual mock
jest.unmock( 'debug' );
jest.useRealTimers(); // needed for 'should dispatch related word fetch complete'

import { relatedWordsMiddleware } from '..';
import {
	DOMAIN_SUGGESTIONS_FETCH,
	RELATED_WORD_FETCH,
	RELATED_WORD_FETCH_COMPLETE
} from 'reducers/action-types';
import { isEnglishWord, translateWord } from 'lib/translate';

describe( 'related-words-middleware', () => {
	it( 'should do nothing on unrelated action', () => {
		const store = {
			getState: jest.genMockFunction().mockReturnValue( {} ),
			dispatch: jasmine.createSpy( 'dispatch' )
		};
		const next = jasmine.createSpy( 'next' );

		relatedWordsMiddleware( store )( next )( { type: 'WHATEEEEEVER' } );

		expect( next.calls.count() ).toEqual( 1 );
		expect( store.dispatch.calls.count() ).toEqual( 0 );
	} );

	it( 'should return result of next middleware on unrelated action', () => {
		const nextReturnValue = 'hello';
		const next = jest.genMockFunction().mockReturnValue( nextReturnValue );

		const result = relatedWordsMiddleware( {} )( next )( { type: 'WHATEEEEEVER' } );
		expect( result ).toEqual( nextReturnValue );
	} );

	it( 'should dispatch related word fetch', () => {
		const store = {
			getState: jest.genMockFunction().mockReturnValue( {
				ui: {
					domainSearch: {
						domainKeywords: {
							keywords: [
								{
									value: 'one'
								}
							]
						},
						relatedWords: []
					}
				}
			} ),
			dispatch: jasmine.createSpy( 'dispatch' )
		};
		const next = jasmine.createSpy( 'next' );

		request.__setMockResponse( { body: [] } );
		relatedWordsMiddleware( store )( next )( { type: DOMAIN_SUGGESTIONS_FETCH } );

		expect( store.dispatch ).toBeCalledWith( { type: RELATED_WORD_FETCH, word: 'one' } );
	} );

	pit( 'should dispatch related word fetch complete', () => {
		isEnglishWord.mockImplementation( () => true );
		const word = 'one';
		const relatedWords = [ 'hello' ];
		const moreRelatedWords = [ 'bye' ];
		const store = {
			getState: jest.fn( () => ( {
				ui: {
					domainSearch: {
						domainKeywords: {
							keywords: [
								{
									value: word
								}
							]
						},
						relatedWords: []
					}
				}
			} ) ),
			dispatch: jest.fn()
		};
		const next = jasmine.createSpy( 'next' );

		request.__setMockResponse( {
			body: [
				{ words: relatedWords },
				{ words: moreRelatedWords }
			]
		} );
		relatedWordsMiddleware( store )( next )( { type: DOMAIN_SUGGESTIONS_FETCH } );

		// real timers should be used for that test to work
		return new Promise( ( resolve ) => setImmediate( resolve ) )
			.then( () => {
				// that guaranteed to work because of the mocked superagent has no async
				expect( store.dispatch ).lastCalledWith( { type: RELATED_WORD_FETCH_COMPLETE, word, data: relatedWords.concat( moreRelatedWords ) } );
			} );
	} );

	pit( 'should localize words according to locale', () => {
		const dictionary = {
			hello: 'привет',
			bye: 'пока',
			one: 'один'
		};

		// make it translate
		isEnglishWord.mockImplementation( () => false );
		i18n.getLocaleSlug = () => 'ru';

		// Mock translation to not go out for API
		translateWord.mockImplementation( ( word, targetLanguage ) => {
			return new Promise( ( resolve, reject ) => {
				if ( targetLanguage === 'ru' ) {
					if ( word in dictionary ) {
						return resolve( { word: dictionary[ word ], sourceLanguage: 'en' } );
					}
				}

				if ( targetLanguage === 'en' && word === dictionary.one ) {
					return resolve( { word: 'one', sourceLanguage: 'ru' } );
				}

				return reject( new Error( 'Can not translate' ) );
			} );
		} );

		const word = dictionary.one;
		const relatedWords = [ 'hello' ];
		const moreRelatedWords = [ 'bye' ];
		const store = {
			getState: jest.fn( () => ( {
				ui: {
					domainSearch: {
						domainKeywords: {
							keywords: [
								{
									value: word
								}
							]
						},
						relatedWords: []
					}
				}
			} ) ),
			dispatch: jest.fn()
		};
		const next = jasmine.createSpy( 'next' );

		request.__setMockResponse( {
			body: [
				{ words: relatedWords },
				{ words: moreRelatedWords }
			]
		} );
		relatedWordsMiddleware( store )( next )( { type: DOMAIN_SUGGESTIONS_FETCH } );

		// real timers should be used for that test to work
		return new Promise( ( resolve ) => setImmediate( resolve ) )
			.then( () => {
				const translatedData = relatedWords.concat( moreRelatedWords ).map( ( englishWord ) => dictionary[ englishWord ] );

				// that guaranteed to work because of the mocked superagent has no async
				expect( store.dispatch ).lastCalledWith( { type: RELATED_WORD_FETCH_COMPLETE, word, data: translatedData } );
			} );
	} );
} );
