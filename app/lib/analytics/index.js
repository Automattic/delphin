/**
 * External dependencies
 */
import assign from 'lodash/assign';
import debugFactory from 'debug';
import omit from 'lodash/omit';
import startsWith from 'lodash/startsWith';
import isUndefined from 'lodash/isUndefined';
const debug = debugFactory( 'delphin:analytics' );

/**
 * Internal dependencies
 */
import config, { isEnabled } from 'config';
import { loadScript } from 'lib/load-script';

if ( process.env.BROWSER ) {
	// Load tracking scripts
	window._tkq = window._tkq || [];
	window.ga = window.ga || function() {
		( window.ga.q = window.ga.q || [] ).push( arguments );
	};
	window.ga.l = +new Date();

	loadScript( '//stats.wp.com/w.js?51' );
	loadScript( '//www.google-analytics.com/analytics.js' );
}

function buildQuerystring( group, name ) {
	let uriComponent = '';

	if ( 'object' === typeof group ) {
		for ( let key in group ) {
			uriComponent += '&x_' + encodeURIComponent( key ) + '=' + encodeURIComponent( group[ key ] );
		}
		debug( 'Bumping stats %o', group );
	} else {
		uriComponent = '&x_' + encodeURIComponent( group ) + '=' + encodeURIComponent( name );
		debug( 'Bumping stat "%s" in group "%s"', name, group );
	}

	return uriComponent;
}

function buildQuerystringNoPrefix( group, name ) {
	let uriComponent = '';

	if ( 'object' === typeof group ) {
		for ( let key in group ) {
			uriComponent += '&' + encodeURIComponent( key ) + '=' + encodeURIComponent( group[ key ] );
		}
		debug( 'Built stats %o', group );
	} else {
		uriComponent = '&' + encodeURIComponent( group ) + '=' + encodeURIComponent( name );
		debug( 'Built stat "%s" in group "%s"', name, group );
	}

	return uriComponent;
}

// we use this variable to track URL paths submitted to analytics.pageView.record
// so that analytics.pageLoading.record can re-use the urlPath parameter.
// this helps avoid some nasty coupling, but it's not the cleanest code - sorry.
let mostRecentUrlPath = null;

window.addEventListener( 'popstate', function() {
	// throw away our URL value if the user used the back/forward buttons
	mostRecentUrlPath = null;
} );

const analytics = {
	user: null,

	superProps: null,

	initialize( user, superProps ) {
		analytics.setUser( user );
		analytics.setSuperProps( superProps );
		analytics.identifyUser();
	},

	setUser( { id, username } ) {
		this.user = { id, username };
	},

	setSuperProps( superProps ) {
		this.superProps = superProps;
	},

	mc: {
		bumpStat( group, name ) {
			const uriComponent = buildQuerystring( group, name ); // prints debug info
			if ( isEnabled( 'mc_analytics_enabled' ) ) {
				new Image().src = document.location.protocol + '//pixel.wp.com/g.gif?v=wpcom-no-pv' + uriComponent + '&t=' + Math.random();
			}
		},

		bumpStatWithPageView( group, name ) {
			// this function is fairly dangerous, as it bumps page views for wpcom and should only be called in very specific cases.
			const uriComponent = buildQuerystringNoPrefix( group, name ); // prints debug info
			if ( isEnabled( 'mc_analytics_enabled' ) ) {
				new Image().src = document.location.protocol + '//pixel.wp.com/g.gif?v=wpcom' + uriComponent + '&t=' + Math.random();
			}
		}
	},

	// pageView is a wrapper for pageview events across Tracks and GA
	pageView: {
		record( urlPath, pageTitle ) {
			mostRecentUrlPath = urlPath;
			analytics.tracks.recordPageView( urlPath );
			analytics.ga.recordPageView( urlPath, pageTitle );
		}
	},

	timing: {
		record( eventType, duration, triggerName ) {
			const urlPath = mostRecentUrlPath || 'unknown';
			analytics.ga.recordTiming( urlPath, eventType, duration, triggerName );
			analytics.statsd.recordTiming( urlPath, eventType, duration, triggerName );
		}
	},

	tracks: {
		recordEvent( eventName, eventProperties = {} ) {
			debug( 'Record event "%s" called with props %o', eventName, eventProperties );

			if ( eventName.indexOf( config( 'tracks_event_prefix' ) ) !== 0 ) {
				debug( `- Event name must be prefixed by "${ config( 'tracks_event_prefix' ) }"` );
				return;
			}

			const { superProps } = analytics;
			if ( superProps ) {
				debug( '- Super Props: %o', superProps );
				eventProperties = assign( {}, eventProperties, superProps ); // assign to a new object so we don't modify the argument
			}

			// Remove properties that have an undefined value
			// This allows a caller to easily remove properties from the recorded set by setting them to undefined
			eventProperties = omit( eventProperties, isUndefined );

			debug( 'Recording event "%s" with actual props %o', eventName, eventProperties );

			window._tkq.push( [ 'recordEvent', eventName, eventProperties ] );
		},

		recordPageView: function( urlPath ) {
			analytics.tracks.recordEvent( `${ config( 'tracks_event_prefix' ) }page_view`, {
				path: urlPath
			} );
		}
	},

	statsd: {
		recordTiming( pageUrl, eventType, duration ) {
			if ( isEnabled( 'boom_analytics_enabled' ) ) {
				let featureSlug = pageUrl === '/' ? 'homepage' : pageUrl.replace( /^\//, '' ).replace( /\.|\/|:/g, '_' ),
					matched;

				// prevent explosion of read list metrics
				// this is a hack - ultimately we want to report this URLs in a more generic way to
				// google analytics
				if ( startsWith( featureSlug, 'read_list' ) ) {
					featureSlug = 'read_list';
				} else if ( startsWith( featureSlug, 'tag_' ) ) {
					featureSlug = 'tag__id';
				} else if ( startsWith( featureSlug, 'domains_add_suggestion_' ) ) {
					featureSlug = 'domains_add_suggestion__suggestion__domain';
				} else if ( startsWith( document.location.pathname, '/plugins/browse/' ) ) {
					featureSlug = 'plugins_browse__site';
				} else if ( featureSlug.match( /^plugins_[^_].*__/ ) ) {
					featureSlug = 'plugins__site__plugin';
				} else if ( featureSlug.match( /^plugins_[^_]/ ) ) {
					featureSlug = 'plugins__site__unknown'; // fail safe because there seems to be some URLs we're not catching
				} else if ( startsWith( featureSlug, 'read_post_feed_' ) ) {
					featureSlug = 'read_post_feed__id';
				} else if ( startsWith( featureSlug, 'read_post_id_' ) ) {
					featureSlug = 'read_post_id__id';
				} else if ( ( matched = featureSlug.match( /^start_(.*)_(..)$/ ) ) != null ) {
					featureSlug = `start_${matched[1]}`;
				}

				const json = JSON.stringify( {
					beacons: [
						'delphin.' + isEnabled( 'boom_analytics_key' ) + '.' + featureSlug + '.' + eventType.replace( '-', '_' ) + ':' + duration + '|ms'
					]
				} );

				new Image().src = 'https://pixel.wp.com/boom.gif?v=delphin&u=' + encodeURIComponent( pageUrl ) + '&json=' + encodeURIComponent( json );
			}
		}
	},

	// Google Analytics usage and event stat tracking
	ga: {
		initialized: false,

		initialize() {
			let parameters = {};

			if ( ! analytics.ga.initialized && isEnabled( 'google_analytics_enabled' ) ) {
				if ( this.user ) {
					parameters = { userId: 'u-' + this.user.id };
				}
				window.ga( 'create', config( 'google_analytics_key' ), 'auto', parameters );
				analytics.ga.initialized = true;
			}
		},

		recordPageView( urlPath, pageTitle ) {
			analytics.ga.initialize();

			debug( 'Recording Page View ~ [URL: ' + urlPath + '] [Title: ' + pageTitle + ']' );

			if ( isEnabled( 'google_analytics_enabled' ) ) {
				// Set the current page so all GA events are attached to it.
				window.ga( 'set', 'page', urlPath );

				window.ga( 'send', {
					hitType: 'pageview',
					page: urlPath,
					title: pageTitle
				} );
			}
		},

		recordEvent( category, action, label, value ) {
			analytics.ga.initialize();

			let debugText = 'Recording Event ~ [Category: ' + category + '] [Action: ' + action + ']';

			if ( 'undefined' !== typeof label ) {
				debugText += ' [Option Label: ' + label + ']';
			}

			if ( 'undefined' !== typeof value ) {
				debugText += ' [Option Value: ' + value + ']';
			}

			debug( debugText );

			if ( isEnabled( 'google_analytics_enabled' ) ) {
				window.ga( 'send', 'event', category, action, label, value );
			}
		},

		recordTiming( urlPath, eventType, duration, triggerName ) {
			analytics.ga.initialize();

			debug( 'Recording Timing ~ [URL: ' + urlPath + '] [Duration: ' + duration + ']' );

			if ( isEnabled( 'google_analytics_enabled' ) ) {
				window.ga( 'send', 'timing', urlPath, eventType, duration, triggerName );
			}
		}
	},

	identifyUser() {
		// Don't identify the user if we don't have one
		if ( this.user ) {
			window._tkq.push( [ 'identifyUser', this.user.id, this.user.username ] );
		}
	},

	setProperties( properties ) {
		window._tkq.push( [ 'setProperties', properties ] );
	},

	clearedIdentity() {
		window._tkq.push( [ 'clearIdentity' ] );
	}
};

export default analytics;
