// External dependencies
import { bindHandlers } from 'react-bind-handlers';
import i18n from 'i18n-calypso';
import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import Button from 'components/ui/button';
import { preventWidows } from 'lib/formatters';
import styles from './styles.scss';
import SunriseStep from 'components/ui/sunrise-step';

class SetUpDomain extends Component {
	handleSubmit( event ) {
		event.preventDefault();
	}

	render() {
		const { domain } = this.props.params;

		return (
			<SunriseStep>
				<SunriseStep.Header>
					<h1>{ i18n.translate( 'Tell us about your blog' ) }</h1>
					<h2>
						{ preventWidows( i18n.translate( 'Just answer a few simple questions about your plans for %(domain)s, ' +
							"then we'll take care of the heavy lifting for you!", {
								args: { domain },
							}
						), 2 ) }
					</h2>
				</SunriseStep.Header>
				<SunriseStep.Form onSubmit={ this.handleSubmit }>
					<label htmlFor="existing">
						<input type="radio" id="existing" name="blog-type" value="existing" />
						{ i18n.translate( "A blog I've already created" ) }
					</label>
					<label htmlFor="new">
						<input type="radio" id="new" name="blog-type" value="new" />
						{ i18n.translate( 'A blog I am going to create' ) }
					</label>
					<Button>
						{ i18n.translate( 'Next' ) }
					</Button>
				</SunriseStep.Form>
			</SunriseStep>
		);
	}
}

export default withStyles( styles )( bindHandlers( SetUpDomain ) );
