// External dependencies
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import Button from 'components/ui/button';
import DocumentTitle from 'components/ui/document-title';
import DomainInput from 'components/ui/domain-input';
import styles from './styles.scss';
import ValidationError from 'components/ui/form/validation-error';
import withPageView from 'lib/analytics/with-page-view';

const SunriseHome = React.createClass( {
	propTypes: {
		confirmDomainPath: PropTypes.string.isRequired,
		fetchDomainPrice: PropTypes.func.isRequired,
		fields: PropTypes.object.isRequired,
		handleSubmit: PropTypes.func.isRequired,
		isRequestingDomainPrice: PropTypes.bool.isRequired,
		redirectToConfirmDomain: PropTypes.func.isRequired,
		selectDomain: PropTypes.func.isRequired,
		submitFailed: PropTypes.bool.isRequired,
		values: PropTypes.object.isRequired
	},

	getInitialState() {
		return { disabledWhileServerSide: true };
	},

	componentDidMount() {
		// Enables the submit button only when we switch from server-side to client-side rendering using the fact that
		// componentDidMount is only invoked on the client
		this.setState( { disabledWhileServerSide: false } ); /* eslint react/no-did-mount-set-state: 0 */
	},

	handleSubmit() {
		const { query } = this.props.values;

		this.props.fetchDomainPrice( query ).then( action => {
			this.props.selectDomain( action.result );
			this.props.redirectToConfirmDomain();
		} );
	},

	render() {
		const { fields: { query }, handleSubmit, confirmDomainPath } = this.props;

		return (
			<div className={ styles.homeContainer }>
				<form className={ styles.form } onSubmit={ handleSubmit( this.handleSubmit ) }
						method="get" action={ confirmDomainPath } >
					<DocumentTitle />

					<div className={ styles.whatsYourStory } />

					<h2 className={ styles.heading }>
						{ i18n.translate( 'Every .blog is a story. Tell yours.', {
							components: { em: <em className="emphasis" /> }
						} ) }
					</h2>

					<div className={ styles.domainSearch }>
						<div className={ styles.field }>
							<DomainInput
								{ ...query }
								autoComplete="off"
								autoFocus
								placeholder={ i18n.translate( 'Enter your domain name' ) }
								field={ this.props.fields.query }
								ref="query" />

							<ValidationError field={ this.props.fields.query } submitFailed={ this.props.submitFailed } />
						</div>

						<Button className={ styles.button } disabled={ this.state.disabledWhileServerSide || this.props.isRequestingDomainPrice }>
							{ ! this.state.disabledWhileServerSide ? i18n.translate( 'Get started' ) : i18n.translate( 'Loading…' ) }
						</Button>
					</div>

					<div className={ styles.secondaryHeadingContainer }>
						<h3 className={ styles.secondaryHeading }>
							{ i18n.translate(
								'Millions of short, easy to remember domains will be available when the .blog domain goes live November 21. '
							) }
							{ i18n.translate(
								'Apply now to secure the perfect domain for your blog.'
							) }
						</h3>
					</div>
				</form>
			</div>
		);
	}
} );

export default withStyles( styles )( withPageView( SunriseHome, 'Home' ) );
