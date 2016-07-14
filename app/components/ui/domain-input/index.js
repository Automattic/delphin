// External dependencies
import classNames from 'classnames';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import { removeInvalidInputProps } from 'lib/form';
import styles from './styles.scss';

const DomainInput = props => {
	const { className, ...inputProps } = props;

	return (
		<div className={ classNames( className, styles.domainInput ) }>
			<input
				className={ styles.input }
				{ ...removeInvalidInputProps( inputProps ) }
			/>
			<div className={ styles.tldContainer }>
				<div className={ styles.tld }>.blog</div>
			</div>
		</div>
	);
};

DomainInput.propTypes = {
	className: PropTypes.string
};

export default withStyles( styles )( DomainInput );
