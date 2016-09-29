// External dependencies
import { bindHandlers } from 'react-bind-handlers';
import i18n from 'i18n-calypso';
import { Link } from 'react-router';
import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import Button from 'components/ui/button';
import { getPath } from 'routes';
import Form from 'components/ui/form';
import { preventWidows } from 'lib/formatters';
import Radio from 'components/ui/form/radio';
import styles from './styles.scss';
import SunriseStep from 'components/ui/sunrise-step';

class SetUpNewBlog extends Component {
	componentWillMount() {
		const { hasAnsweredPreviousQuestion, domainName, redirect } = this.props;

		if ( ! hasAnsweredPreviousQuestion ) {
			redirect( 'setUpDomain', { pathParams: { domainName } } );
		}
	}

	handleSubmit( { wordpressOrOther } ) {
		const { redirect, domainName } = this.props;

		redirect( 'setUpConnect', {
			pathParams: {
				domainName,
				provider: wordpressOrOther // 'wordpress' -or- 'other'
			}
		} );
	}

	render() {
		const {
			domainName,
			handleSubmit,
			fields: { wordpressOrOther },
		} = this.props;

		return (
			<SunriseStep>
				<SunriseStep.Header>
					<h1>{ i18n.translate( "Let's create a new a blog!" ) }</h1>
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
						<label className={ styles.label } htmlFor="wordpress">
							<Radio
								className={ styles.radio }
								{ ...wordpressOrOther }
								id="wordpress"
								value="wordpress"
								checked={ wordpressOrOther.value === 'wordpress' }
							/>
							{ i18n.translate( 'WordPress.com' ) }
							<p className={ styles.labelDescription }>
								{
									i18n.translate( 'Create a free website or easily build a blog on WordPress.com.' +
										' Hundreds of free, customizable, mobile-ready designs and themes. ' +
										'Free hosting and support.' )
								}
							</p>
						</label>
						<label className={ styles.label } htmlFor="other">
							<Radio
								className={ styles.radio }
								{ ...wordpressOrOther }
								id="other"
								value="other"
								checked={ wordpressOrOther.value === 'other' }
							/>
							{ i18n.translate( 'Somewhere else' ) }
							<p className={ styles.labelDescription }>
								{
									i18n.translate( "We're adding more options soon, but in the meantime" +
										' our happiness engineers can help you. ' )
								}
							</p>
						</label>
					</Form.FieldArea>
					<Form.SubmitArea>
						<Link to={ getPath( 'setUpDomain', { domainName } ) }>
							{ i18n.translate( 'Back' ) }
						</Link>
						<Button>
							{ i18n.translate( 'Next' ) }
						</Button>
					</Form.SubmitArea>
				</Form>
			</SunriseStep>
		);
	}
}

SetUpNewBlog.propTypes = {
	domainName: PropTypes.string.isRequired,
	fields: PropTypes.object.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	hasAnsweredPreviousQuestion: PropTypes.bool.isRequired,
	redirect: PropTypes.func.isRequired,
};

export default withStyles( styles )( bindHandlers( SetUpNewBlog ) );
