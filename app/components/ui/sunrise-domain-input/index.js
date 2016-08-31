// External dependencies
import classNames from 'classnames';
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import DomainInput from 'components/ui/form/domain-input';
import styles from './styles.scss';

const SunriseDomainInput = ( { className, ...inputProps, field } ) => {
	const isInvalid = field.touched && field.error,
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
			<DomainInput
				className={ styles.inputContainer }
				inputClassName={ styles.input }
				gridIconSize={ 32 }
				{ ...inputProps }
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
