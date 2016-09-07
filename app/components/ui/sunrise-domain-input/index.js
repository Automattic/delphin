// External dependencies
import classNames from 'classnames';
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import Input from 'components/ui/form/input';
import styles from './styles.scss';

const SunriseDomainInput = ( { className, field } ) => {
	const isInvalid = field.touched && field.error,
		inputClassName = classNames( className, styles.domainInput, {
			[ styles.hasError ]: isInvalid
		} );

	return (
		<div className={ inputClassName } dir="ltr">
			<label
				htmlFor={ field.name } // `Input` uses `field.name` as the field ID
				className={ styles.label }
			>
				{ i18n.translate( 'Enter your domain name' ) }
			</label>
			<Input
				autoComplete="off"
				autoCapitalize="off"
				autoFocus
				placeholder={ i18n.translate( 'Enter your domain name' ) }
				className={ styles.inputContainer }
				inputClassName={ styles.input }
				gridIconSize={ 32 }
				dir="ltr"
				field={ field }
			/>
			<div className={ styles.tldContainer }>
				<div className={ styles.tld }>.blog</div>
			</div>
		</div>
	);
};

SunriseDomainInput.propTypes = {
	className: PropTypes.string,
	field: PropTypes.object
};

export default withStyles( styles )( SunriseDomainInput );
