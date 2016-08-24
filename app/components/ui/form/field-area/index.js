// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import FormToggle from 'components/ui/form/form-toggle';
import Input from 'components/ui/form/input';
import Phone from 'components/ui/form/phone';
import Select from 'components/ui/form/select';
import State from 'components/ui/form/state';
import styles from './styles.scss';
import { withErrorFocusable, withErrorFocuser } from 'components/ui/form/error-focuser';

export const FieldArea = withErrorFocuser( withStyles( styles )( ( { children, className } ) => (
	<div className={ className || styles.fieldArea }>
		{ children }
	</div>
) ) );

FieldArea.FormToggle = withErrorFocusable( FormToggle );
FieldArea.Input = withErrorFocusable( Input );
FieldArea.Phone = withErrorFocusable( Phone );
FieldArea.Select = withErrorFocusable( Select );
FieldArea.State = withErrorFocusable( State );

FieldArea.propTypes = {
	children: PropTypes.oneOfType( [
		PropTypes.arrayOf( React.PropTypes.node ),
		PropTypes.node
	] ).isRequired,
	className: PropTypes.string,
	errors: PropTypes.object
};

export default FieldArea;
