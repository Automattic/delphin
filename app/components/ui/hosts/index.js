// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import HostThumbnailContainer from 'components/containers/host-thumbnail';

// Internal dependencies
import Medium from 'components/ui/hosts/medium';
import Tumblr from 'components/ui/hosts/tumblr';
import styles from './styles.scss';
import WordPress from 'components/ui/hosts/wordpress';

const hosts = [
	{
		name: 'WordPress.com',
		color: '#0087be',
		logoUrl: <WordPress />,
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
		logoUrl: <Tumblr />,
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
		logoUrl: <Medium />,
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
];

class Hosts extends React.Component {
	render() {
		return <section>
			<h2>{ i18n.translate( 'Where would you like to create your blog?' ) }</h2>
			<p>{ i18n.translate( 'Here are a few powerful options that can be connected automatically to your domain using MagicDomains.' ) }</p>

			<ul className={ styles.hostThumbnailsList } >
				{ hosts.map( ( host ) => <HostThumbnailContainer { ...host } /> ) }
			</ul>
		</section>;
	}
}

Hosts.propTypes = {
	hosts: PropTypes.arrayOf( PropTypes.object ).isRequired
};

export default withStyles( styles )( Hosts );
