// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

import FieldArea from 'components/ui/form/field-area';
import SubmitArea from 'components/ui/form/submit-area';

const Form = withStyles( styles )( ( { children, className, onSubmit } ) => (
	<form onSubmit={ onSubmit } className={ className || styles.form }>
		{ children }
	</form>
) );

Form.FieldArea = FieldArea;
Form.SubmitArea = SubmitArea;

Form.propTypes = {
	children: PropTypes.oneOfType( [
		PropTypes.arrayOf( React.PropTypes.node ),
		PropTypes.node
	] ).isRequired,
	className: PropTypes.string,
	onSubmit: PropTypes.func.isRequired
};

export default Form;
