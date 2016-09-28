// External dependencies
import { bindHandlers } from 'react-bind-handlers';
import i18n from 'i18n-calypso';
import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import Button from 'components/ui/button';
import { getPath } from 'routes';
import Form from 'components/ui/form';
import { Link } from 'react-router';
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

	handleSubmit() {
		const { redirect, domainName } = this.props;
		redirect( 'hosts', { pathParams: { domainName } } );
	}

	render() {
		const {
			domainName,
			handleSubmit,
			fields: { simpleOrAdvanced },
		} = this.props;

		return (
			<SunriseStep>
				<SunriseStep.Header>
					<h1>{ i18n.translate( "Let's create a new a blog!" ) }</h1>
					<h2>
						{ preventWidows( i18n.translate( "We'll help you create your blog by suggesting popular services" +
							" based on your needs. Then we'll get your domain connected."
						), 2 ) }
					</h2>
				</SunriseStep.Header>
				<Form onSubmit={ handleSubmit( this.handleSubmit ) }>
					<Form.FieldArea>
						<label className={ styles.label } htmlFor="simple">
							<Radio
								className={ styles.radio }
								{ ...simpleOrAdvanced }
								id="simple"
								value="simple"
								checked={ simpleOrAdvanced.value === 'simple' }
							/>
							{ i18n.translate( 'Simple & Quick' ) }
							<p className={ styles.labelDescription }>
								{
									i18n.translate( 'Having a simple tool (with no coding) is more important than full ' +
									'control over the layout and look.' )
								}
							</p>
						</label>
						<label className={ styles.label } htmlFor="advanced">
							<Radio
								className={ styles.radio }
								{ ...simpleOrAdvanced }
								id="advanced"
								value="advanced"
								checked={ simpleOrAdvanced.value === 'advanced' }
							/>
							{ i18n.translate( 'More Control & Power' ) }
							<p className={ styles.labelDescription }>
								{
									i18n.translate( "I want full control of the look and feel and I don't mind getting " +
										'my hands dirty with code as needed.' )
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
