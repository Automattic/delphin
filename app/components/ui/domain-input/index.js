// External dependencies
import classNames from 'classnames';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

const DomainInput = props => {
	const { className, ...inputProps } = props;

	console.log( inputProps );
	console.log( className );

	return (
		<div className={ classNames( className, styles.domainInput ) }>
			<input
				className={ styles.input }
				{ ...inputProps }
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
