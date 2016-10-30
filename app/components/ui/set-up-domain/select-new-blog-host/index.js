// External dependencies
import { bindHandlers } from 'react-bind-handlers';
import i18n from 'i18n-calypso';
import { Link } from 'react-router';
import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import Button from 'components/ui/button';
import DocumentTitle from 'components/ui/document-title';
import { getPath } from 'routes';
import Form from 'components/ui/form';
import { preventWidows } from 'lib/formatters';
import Radio from 'components/ui/form/radio';
import styles from './styles.scss';
import SunriseStep from 'components/ui/sunrise-step';

class SelectNewBlogHost extends Component {
	componentWillMount() {
		const { hasAnsweredPreviousQuestion, domainName, redirect } = this.props;

		if ( ! hasAnsweredPreviousQuestion ) {
			redirect( 'selectBlogType', { pathParams: { domainName } } );
		}
	}

	handleSubmit( { wordpressOrOther } ) {
		const { redirect, domainName } = this.props;

		let nextPageSlug = '';

		if ( wordpressOrOther === 'wordpress' ) {
			nextPageSlug = 'connectingNewBlog';
		} else {
			nextPageSlug = 'connectNewBlogToOther';
		}

		redirect( nextPageSlug, { pathParams: { domainName } } );
	}

	render() {
		const {
			domainName,
			handleSubmit,
			fields: { wordpressOrOther },
		} = this.props;

		return (
			<SunriseStep isSetupDomain={ true }>
				<DocumentTitle title={ i18n.translate( 'Set up domain' ) } />

				<SunriseStep.Header>
					<h1>{ i18n.translate( "Let's create a new blog!" ) }</h1>
					<h2>
						{ preventWidows( i18n.translate( "Choose where you'd like to create your new blog. " +
							" We'll connect {{strong}}%(domainName)s{{/strong}} for you and get you started creating your new blog.",
							{
								args: { domainName },
								components: { strong: <strong /> }
							}
						), 2 ) }
					</h2>
				</SunriseStep.Header>
				<Form onSubmit={ handleSubmit( this.handleSubmit ) }>
					<Form.FieldArea>
						<h3>
							{ i18n.translate( 'Where would you like to create your new blog?' ) }
						</h3>

						<strong className={ styles.preLabel }>
							{ i18n.translate( 'I want simple and quick:' ) }
						</strong>
						<label className={ styles.label } htmlFor="wordpress">
							<Radio
								className={ styles.radio }
								{ ...wordpressOrOther }
								id="wordpress"
								value="wordpress"
								checked={ wordpressOrOther.value === 'wordpress' }
							/>
							<h3 className={ styles.labelHost }>
								{ i18n.translate( 'WordPress.com' ) }
							</h3>
							<p className={ styles.labelDescription }>
								{
									i18n.translate( 'Create a free website or easily build a blog on WordPress.com.' +
										' Hundreds of free, customizable, mobile-ready designs and themes. ' +
										'Free hosting and support.' )
								}
							</p>
						</label>

						<strong className={ styles.preLabel }>
							{ i18n.translate( 'I want more control and power:' ) }
						</strong>
						<label className={ styles.label } htmlFor="pressable">
							<Radio
								className={ styles.radio }
								{ ...wordpressOrOther }
								id="pressable"
								value="pressable"
								checked={ wordpressOrOther.value === 'pressable' }
							/>
							<h3 className={ styles.labelHost }>
								{ i18n.translate( 'Pressable' ) }
							</h3>
							<p className={ styles.labelDescription }>
								{
									i18n.translate( 'Create a website or easily build a blog.' +
										' Hundreds of free, customizable, mobile-ready designs and themes. ' +
										'Upload your own themes and plugins.' )
								}
							</p>
						</label>
					</Form.FieldArea>
					<Form.SubmitArea>
						<Button>
							{ i18n.translate( 'Next' ) }
						</Button>
					</Form.SubmitArea>
					<Form.Footer>
						<h3>{ i18n.translate( 'Want a different blogging platform?' ) }</h3>
						<p>
							{ i18n.translate( 'We\'re adding more options soon, but in the meantime our Happiness Engineers can help you {{link}}create a new blog somewhere else{{/link}}.', {
								components: { link: <a href="#" /> }
							} ) }
						</p>
					</Form.Footer>
				</Form>

				<SunriseStep.Footer>
					<Link to={ getPath( 'selectBlogType', { domainName } ) }>
						{ i18n.translate( 'Back' ) }
					</Link>
				</SunriseStep.Footer>
			</SunriseStep>
		);
	}
}

SelectNewBlogHost.propTypes = {
	domainName: PropTypes.string.isRequired,
	fields: PropTypes.object.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	hasAnsweredPreviousQuestion: PropTypes.bool.isRequired,
	redirect: PropTypes.func.isRequired,
};

export default withStyles( styles )( bindHandlers( SelectNewBlogHost ) );
