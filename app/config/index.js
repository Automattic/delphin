// Internal dependencies
import languages from './languages';

const NODE_ENV = process.env.NODE_ENV,
	productionOnly = NODE_ENV === 'production';

const config = {
	available_tlds: [ 'live' ],
	default_tld: 'live',
	default_search_sort: 'recommended',
	env: NODE_ENV || 'development',
	i18n_default_locale_slug: 'en',
	initial_number_of_search_results: 6,
	features: {
		boom_analytics_enabled: productionOnly,
		google_analytics_enabled: productionOnly,
		mc_analytics_enabled: productionOnly
	},
	languages,
	tracks_event_prefix: 'delphin_',
	wordpress: {
		rest_api_oauth_client_id: 46199,
		rest_api_oauth_client_secret: '7FVcj4q9nDvX3ic812oAGDR2oZFjSk0woryR0rRmNIO5Gn7k6HibTIlhvC7Wmof9'
	},
	wordnik_api_key: '***REMOVED***',
	google_translate_api_key: '***REMOVED***',
	hosts: [
		{
			name: 'WordPress.com',
			color: '#0087be',
			logoUrl: '',
			coverUrl: '',
			shortDescription: 'Create a free website or easily build a blog on WordPress.com. Hundreds of free, customizable, mobile-ready designs and themes. Free hosting and support.',
			longDescription: [
				'WordPress.com allows you to build any kind of site you want: business site, blog, portfolio, the sky is the limit! Hundreds of free, customizable, mobile-ready designs and themes. Free hosting and support.',
				'When you write on Medium, you’ll know that your words and pictures will look great on any device; they’ll automatically adjust to the latest technology and even get better over time.',
				'Medium’s composing tool is truly what-you-see-is-what-you-get and has just the right amount of formatting to tell your stories without getting in the way. In short, Medium is focused on keeping you focused.',
			],
			bestForTags: [ 'blogging', 'e-commerce', 'protfolios', 'websites' ],
			price: {
				start: 5,
				end: 49,
				currency: 'usd'
			}
		},
		{
			name: 'Tumblr',
			color: '#36465d',
			logoUrl: '',
			coverUrl: '',
			shortDescription: 'Post anything (from anywhere!), customize everything (but limited), and find and follow what you love. Create your own Tumblr blog today.',
			longDescription: [
				'Post anything (from anywhere!), customize everything (but limited), and find and follow what you love. Create your own Tumblr blog today.',
				'Posting a blog in Tumblr couldn\'t be easier. A simple drop-down menu shows icons for text, photo, quote, links, chat, audio and video. If you want to solely write a short text blog, you have a simple text editor at your disposal. An HTML editor is also available for the technically inclined.',
				'Once you upload photos and videos to your page, Tumblr keeps the files as part of your media library, should you choose to repost them. Tumblr makes good use of widgets and allows you to customize their placement.'
			],
			bestForTags: [ 'blogging' ],
			price: null
		},
		{
			name: 'Medium',
			color: '#000',
			logoUrl: '',
			coverUrl: '',
			shortDescription: 'Medium is a beautiful space for reading and writing — and little else. There are no gratuitous sidebars, plug-ins, or widgets. There is nothing to set up or customize.',
			longDescription: [
				'Medium is a beautiful space for reading and writing — and little else. The words are central. They can be accompanied by images to help illustrate your point. But there are no gratuitous sidebars, plug-ins, or widgets. There is nothing to set up or customize.',
				'When you write on Medium, you’ll know that your words and pictures will look great on any device; they’ll automatically adjust to the latest technology and even get better over time.',
				'Medium’s composing tool is truly what-you-see-is-what-you-get and has just the right amount of formatting to tell your stories without getting in the way. In short, Medium is focused on keeping you focused.',
			],
			bestForTags: [ 'blogging', 'editorial' ],
			price: null
		}
	]
};

export default function( key ) {
	return config[ key ];
}

export function isEnabled( feature ) {
	return config.features[ feature ];
}
