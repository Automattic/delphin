// External dependencies
import classNames from 'classnames';
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import Input from 'components/ui/form/input';
import { removeInvalidInputProps } from 'lib/form';
import styles from './styles.scss';

class DomainInput extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			// in case the app has not loaded yet, add a simple validation for the domain field
			inputPattern: '[a-zA-Z0-9\-]+(\.[a-zA-Z]+)?'
		};
	}

	componentDidMount() {
		// once the app loaded, redux form validation handles this
		this.setState( { inputPattern: null } ); /* eslint react/no-did-mount-set-state: 0 */
	}

	render() {
		const { className, ...inputProps, field } = this.props,
			isInvalid = field.touched && field.error,
			inputClassName = classNames( className, styles.domainInput, {
				[ styles.hasError ]: isInvalid
			} );

		return (
			<div className={ inputClassName }>
				<label
					htmlFor={ field.name } // `Input` uses `field.name` as the field ID
					className={ styles.label }
				>
					{ i18n.translate( 'Enter your domain name' ) }
				</label>
				<Input
					className={ styles.inputContainer }
					inputClassName={ styles.input }
					gridIconSize={ 32 }
					pattern={ this.state.inputPattern }
					{ ...removeInvalidInputProps( inputProps ) }
				/>
				<div className={ styles.tldContainer }>
					<div className={ styles.tld }>.blog</div>
				</div>
			</div>
		);
	}
}

DomainInput.propTypes = {
	className: PropTypes.string,
	field: PropTypes.object
};

export default withStyles( styles )( DomainInput );
