// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

import FieldArea from 'components/ui/form/field-area';
import SubmitArea from 'components/ui/form/submit-area';
import { withErrorFocuser } from 'components/ui/form/error-focuser';

const Form = withErrorFocuser( withStyles( styles )( ( { children, onSubmit } ) => (
	<form onSubmit={ onSubmit } className={ styles.form }>
		{ children }
	</form>
) ) );

Form.FieldArea = FieldArea;
Form.SubmitArea = SubmitArea;

Form.propTypes = {
	children: PropTypes.oneOfType( [
		PropTypes.arrayOf( React.PropTypes.node ),
		PropTypes.node
	] ).isRequired,
	errors: PropTypes.object,
	onSubmit: PropTypes.func.isRequired
};

export default Form;
