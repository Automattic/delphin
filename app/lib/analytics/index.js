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
import { stripLocaleSlug } from 'lib/routes';

// Load tracking scripts
if ( process.env.BROWSER ) {
	if ( isEnabled( 'tracks' ) ) {
		window._tkq = window._tkq || [];

		loadScript( '//stats.wp.com/w.js?53' );
	}

	if ( isEnabled( 'google_analytics' ) ) {
		window.ga = window.ga || function() {
			( window.ga.q = window.ga.q || [] ).push( arguments );
		};
		window.ga.l = Number( new Date() );

		loadScript( '//www.google-analytics.com/analytics.js' );
	}

	if ( isEnabled( 'googleads' ) ) {
		loadScript( '//www.googleadservices.com/pagead/conversion_async.js' );
	}

	if ( isEnabled( 'bingads' ) ) {
		window.uetq = window.uetq || [];
		loadScript( '//bat.bing.com/bat.js', () => {
			if ( window.UET ) {
				window.uetq = new window.UET( {
					ti: config( 'bing_tag_id' ),
					q: window.uetq
				} );
			}
			window.uetq.push( 'pageLoad' );
		} );
	}

	if ( isEnabled( 'quantcast' ) ) {
		window.ezt = window.ezt || [];
		window._qevents = window._qevents || [];
		loadScript( 'https://secure.quantserve.com/aquant.js?a=p--q2ngEqybdRaX', () => {
			window._qevents.push( {
				qacct: config( 'quantcast_account_id' )
			} );
		} );
	}

	if ( isEnabled( 'facebookads' ) ) {
		window._fbq = window.fbq = function() {
			if ( window.fbq.callMethod ) {
				window.fbq.callMethod.apply( window.fbq, arguments );
			} else {
				window.fbq.queue.push( arguments );
			}
		};
		window.fbq.push = window.fbq;
		window.fbq.loaded = true;
		window.fbq.version = '2.0';
		window.fbq.queue = [];
		loadScript( 'https://connect.facebook.net/en_US/fbevents.js', () => {
			window.fbq( 'init', config( 'facebook_pixel_id' ) );
		} );
	}
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

	superProps: {
		launch_period: 'ga'
	},

	mc: {
		bumpStat( group, name ) {
			const uriComponent = buildQuerystring( group, name ); // prints debug info
			if ( isEnabled( 'mc_analytics' ) ) {
				new Image().src = document.location.protocol + '//pixel.wp.com/g.gif?v=wpcom-no-pv' + uriComponent + '&t=' + Math.random();
			}
		},

		bumpStatWithPageView( group, name ) {
			// this function is fairly dangerous, as it bumps page views for wpcom and should only be called in very specific cases.
			const uriComponent = buildQuerystringNoPrefix( group, name ); // prints debug info
			if ( isEnabled( 'mc_analytics' ) ) {
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
			analytics.facebookads.recordPageView();
		}
	},

	timing: {
		record( eventType, duration, triggerName ) {
			const urlPath = mostRecentUrlPath || 'unknown';
			analytics.ga.recordTiming( urlPath, eventType, duration, triggerName );
			analytics.statsd.recordTiming( urlPath, eventType, duration, triggerName );
		}
	},

	conversion: {
		recordPurchase( orderId, revenue, currencyCode ) {
			if ( ! isEnabled( 'ad_tracking' ) ) {
				return;
			}

			analytics.googleads.recordPurchase( orderId, revenue, currencyCode );
			analytics.bingads.recordPurchase( orderId, revenue, currencyCode );
			analytics.quantcast.recordPurchase( orderId, revenue, currencyCode );
			analytics.facebookads.recordPurchase( orderId, revenue, currencyCode );
		}
	},

	tracks: {
		identifyUser( { id, username } ) {
			if ( ! isEnabled( 'tracks' ) ) {
				return;
			}

			debug( 'Identifying user with id: %s and username: %s', id, username );

			window._tkq.push( [ 'identifyUser', id, username ] );
		},

		recordEvent( eventName, eventProperties = {} ) {
			if ( ! isEnabled( 'tracks' ) ) {
				return;
			}

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
			if ( ! isEnabled( 'tracks' ) ) {
				return;
			}

			analytics.tracks.recordEvent( `${ config( 'tracks_event_prefix' ) }page_view`, {
				path: urlPath,
				canonical_path: stripLocaleSlug( urlPath ),
			} );
		}
	},

	statsd: {
		recordTiming( pageUrl, eventType, duration ) {
			if ( isEnabled( 'boom_analytics' ) ) {
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
					featureSlug = `start_${ matched[ 1 ] }`;
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

			if ( ! analytics.ga.initialized && isEnabled( 'google_analytics' ) ) {
				if ( this.user ) {
					parameters = { userId: 'u-' + this.user.id };
				}
				window.ga( 'create', config( 'google_analytics_key' ), 'auto', parameters );
				analytics.ga.initialized = true;
			}
		},

		recordPageView( urlPath, pageTitle ) {
			if ( ! isEnabled( 'google_analytics' ) ) {
				return;
			}

			analytics.ga.initialize();

			debug( 'Recording Page View ~ [URL: ' + urlPath + '] [Title: ' + pageTitle + ']' );

			// Set the current page so all GA events are attached to it.
			window.ga( 'set', 'page', urlPath );

			window.ga( 'send', {
				hitType: 'pageview',
				page: urlPath,
				title: pageTitle
			} );
		},

		recordEvent( category, action, label, value ) {
			if ( ! isEnabled( 'google_analytics' ) ) {
				return;
			}

			analytics.ga.initialize();

			let debugText = 'Recording Event ~ [Category: ' + category + '] [Action: ' + action + ']';

			if ( 'undefined' !== typeof label ) {
				debugText += ' [Option Label: ' + label + ']';
			}

			if ( 'undefined' !== typeof value ) {
				debugText += ' [Option Value: ' + value + ']';
			}

			debug( debugText );

			window.ga( 'send', 'event', category, action, label, value );
		},

		recordTiming( urlPath, eventType, duration, triggerName ) {
			if ( ! isEnabled( 'google_analytics' ) ) {
				return;
			}

			analytics.ga.initialize();

			debug( 'Recording Timing ~ [URL: ' + urlPath + '] [Duration: ' + duration + ']' );

			window.ga( 'send', 'timing', urlPath, eventType, duration, triggerName );
		}
	},

	googleads: {
		recordPurchase( orderId, revenue, currencyCode ) {
			if ( ! isEnabled( 'googleads' ) || ! window.google_trackConversion ) {
				return;
			}

			window.google_trackConversion( {
				google_conversion_id: config( 'google_conversion_id' ),
				google_conversion_format: 3,
				google_conversion_label: config( 'google_conversion_label' ),
				google_custom_params: {
					orderid: orderId,
					revenue: revenue,
					currency: currencyCode
				},
			} );
		}
	},

	bingads: {
		recordPageView( urlPath, pageTitle ) {
			analytics.bingads.recordEvent( {
				ec: 'PageView',
				ea: urlPath,
				el: pageTitle
			} );
		},

		recordEvent( event ) {
			if ( ! isEnabled( 'bingads' ) || ! window.uetq ) {
				return;
			}

			window.uetq.push( event );
		},

		recordPurchase( orderId, revenue, currencyCode ) {
			analytics.bingads.recordEvent( {
				ec: 'Transaction',
				ea: 'Purchase Confirmation',
				el: orderId,
				ev: revenue,
				gv: revenue,
				gc: currencyCode
			} );
		},
	},

	quantcast: {
		recordEvent( eventName, extra = {} ) {
			if ( ! isEnabled( 'quantcast' ) || ! window._qevents ) {
				return;
			}

			window._qevents.push(
				Object.assign( {
					qacct: config( 'quantcast_account_id' ),
					labels: '_fp.event.' + eventName,
					event: 'refresh'
				}, extra )
			);
		},

		recordPurchase( orderId, revenue, currencyCode ) {
			analytics.quantcast.recordEvent( 'Purchase Confirmation', {
				orderid: orderId,
				currency: currencyCode,
				// revenue needs to be a string for quantcast client
				revenue: ( revenue || 0 ).toString(),
			} );
		}
	},

	facebookads: {
		recordPageView( urlPath, pageTitle ) {
			analytics.facebookads.recordEvent( 'PageView', {
				url_path: urlPath,
				page_title: pageTitle
			} );
		},

		recordEvent( eventName, eventValue = null ) {
			if ( ! isEnabled( 'facebookads' ) || ! window.fbq ) {
				return;
			}

			window.fbq( 'track', eventName, eventValue );
		},

		recordPurchase( orderId, revenue, currencyCode ) {
			analytics.facebookads.recordEvent( 'Purchase Confirmation', {
				orderid: orderId,
				currency: currencyCode,
				revenue
			} );
		}
	}
};

export default analytics;
