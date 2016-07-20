// External dependencies
import { bindHandlers } from 'react-bind-handlers';
import i18n from 'i18n-calypso';
import { Link } from 'react-router';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import Button from 'components/ui/button';
import Form from 'components/ui/form';
import { removeInvalidInputProps } from 'lib/form';
import styles from './styles.scss';
import SunriseStep from 'components/ui/sunrise-step';

class TrademarkVerification extends React.Component {
	handleChange( event ) {
		const reader = new FileReader();
		reader.onload = ( { target } ) => this.props.changeSmd( target.result );
		reader.readAsText( event.target.files[ 0 ], 'UTF-8' );
	}

	render() {
		const { fields, values } = this.props;

		// This is an arbitrary length to determine whether the user has added
		// their SMD file or just entered some text
		const showUploadInput = ! values.smd || values.smd.length < 100;

		return (
			<SunriseStep>
				<SunriseStep.Header>
					<h1>{ i18n.translate( 'Attach your trademark verification' ) }</h1>
					<h2>
						{ i18n.translate( 'Upload or paste the contents of your valid SMD file to ' +
						'verify your rights to register this domain.' ) }
					</h2>
				</SunriseStep.Header>

				<SunriseStep.Form
					className={ styles.form }
					onSubmit={ null }
				>
					<div>
						<div className={ styles.explanationContainer }>
							<h3 className={ styles.explanation }>
								{ i18n.translate( 'SMD (Signed Mark Data) file contents:' ) }
							</h3>
						</div>
						{ showUploadInput && (
							<label className={ styles.fileInputLabel }>
								<input type="file" ref="fileInput" className={ styles.fileInput } onChange={ this.handleChange } />
								<span>
									{ i18n.translate( '{{em}}Upload{{/em}} or paste your SMD file', {
										components: {
											em: <em className={ styles.uploadLink } />
										}
									} ) }
								</span>
							</label>
						) }
						<textarea className={ styles.textarea } { ...removeInvalidInputProps( fields.smd ) } />

						<Button className={ styles.button }>{ i18n.translate( 'Continue with application' ) }</Button>
						<p>
							{ i18n.translate( "Don't own the trademark for foobar.blog?" ) }
						</p>
						<p>
							<Link to="/">{ i18n.translate( 'Try a different domain' ) }</Link>
						</p>
					</div>
				</SunriseStep.Form>

				<SunriseStep.Footer>
					{ i18n.translate( 'An SMD file (Signed Mark Data) acts as proof of ' +
						'your right to pre-register domains that match your trademark.' ) }
					{ ' ' }
					{ i18n.translate( 'Get your SMD file by signing up with the {{a}}Trademark Clearinghouse{{/a}}, ' +
						'an organization assigned to validate trademarks for use in domains.', {
							components: { a: <a target="_blank" href="http://www.trademark-clearinghouse.com/" /> }
						}
					) }
				</SunriseStep.Footer>
			</SunriseStep>
		);
	}
}

TrademarkVerification.propTypes = {
	changeSmd: PropTypes.func.isRequired,
	fields: PropTypes.object.isRequired,
	values: PropTypes.object.isRequired
};

export default withStyles( styles )( bindHandlers( TrademarkVerification ) );
