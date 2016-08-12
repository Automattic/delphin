// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

const Form = ( { onSubmit, fieldArea, submitArea } ) => (
	<form onSubmit={ onSubmit } className={ styles.form }>
		<div className={ styles.fieldArea }>
			{ fieldArea }
		</div>

		<div className={ styles.submitArea }>
			{ submitArea }
		</div>
	</form>
);

Form.propTypes = {
	fieldArea: PropTypes.element.isRequired,
	onSubmit: PropTypes.func.isRequired,
	submitArea: PropTypes.element.isRequired
};

export default withStyles( styles )( Form );
