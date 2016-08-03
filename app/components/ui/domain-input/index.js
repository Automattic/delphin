// External dependencies
import classNames from 'classnames';
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
			<Input
				className={ styles.inputContainer }
				inputClassName={ styles.input }
				gridIconSize={ 32 }
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
