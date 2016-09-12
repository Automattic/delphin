// External dependencies
import { bindHandlers } from 'react-bind-handlers';
import i18n from 'i18n-calypso';
import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import Button from 'components/ui/button';
import { getPath } from 'routes';
import { Link } from 'react-router';
import { preventWidows } from 'lib/formatters';
import Radio from 'components/ui/form/radio';
import styles from './styles.scss';
import SunriseStep from 'components/ui/sunrise-step';

class SetUpDomain extends Component {
	handleSubmit( values ) {
		if ( values.newOrExisting === 'new' ) {
			alert( "TODO: redirect to the 'new blog' setup page" );
		}

		if ( values.newOrExisting === 'existing' ) {
			alert( "TODO: redirect to the 'existing blog' setup page" );
		}
	}

	render() {
		const {
			domainName,
			handleSubmit,
			fields: { newOrExisting },
		} = this.props;

		return (
			<SunriseStep>
				<SunriseStep.Header>
					<h1>{ i18n.translate( 'Tell us about your blog' ) }</h1>
					<h2>
						{ preventWidows( i18n.translate( 'Just answer a few simple questions about your plans for %(domainName)s, ' +
							"then we'll take care of the heavy lifting for you!", {
								args: { domainName }
							}
						), 2 ) }
					</h2>
				</SunriseStep.Header>
				<SunriseStep.Form onSubmit={ handleSubmit( this.handleSubmit ) }>
					<label className={ styles.label } htmlFor="existing">
						<Radio
							className={ styles.radio }
							{ ...newOrExisting }
							id="existing"
							value="existing"
							checked={ newOrExisting.value === 'existing' }
						/>
						{ i18n.translate( "A blog I've already created" ) }
					</label>
					<label className={ styles.label } htmlFor="new">
						<Radio
							className={ styles.radio }
							{ ...newOrExisting }
							id="new"
							value="new"
							checked={ newOrExisting.value === 'new' }
						/>
						{ i18n.translate( 'A blog I am going to create' ) }
					</label>
					<div className={ styles.buttonContainer }>
						<Link
							className={ styles.backLink }
							to={ getPath( 'myDomains' ) }
						>
							{ i18n.translate( 'Back' ) }
						</Link>
						<Button className={ styles.button }>
							{ i18n.translate( 'Next' ) }
						</Button>
					</div>
				</SunriseStep.Form>
			</SunriseStep>
		);
	}
}

SetUpDomain.propTypes = {
	domainName: PropTypes.string.isRequired,
	fields: PropTypes.object.isRequired,
	handleSubmit: PropTypes.func.isRequired,
};

export default withStyles( styles )( bindHandlers( SetUpDomain ) );
