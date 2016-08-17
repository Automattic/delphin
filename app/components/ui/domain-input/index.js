// External dependencies
import classNames from 'classnames';
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import Input from 'components/ui/form/input';
import { removeInvalidInputProps } from 'lib/form';
import styles from './styles.scss';

const DomainInput = props => {
	const { className, ...inputProps, field } = props,
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
				// in case the app has not loaded yet, add a simple validation for the domain field
				pattern={ ! process.env.BROWSER ? '[a-zA-Z0-9\-]+(\.[a-zA-Z]+)?' : null }
				{ ...removeInvalidInputProps( inputProps ) }
			/>
			<div className={ styles.tldContainer }>
				<div className={ styles.tld }>.blog</div>
			</div>
		</div>
	);
};

DomainInput.propTypes = {
	className: PropTypes.string,
	field: PropTypes.object
};

export default withStyles( styles )( DomainInput );
