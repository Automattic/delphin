// External dependencies
import classNames from 'classnames';
const Gridicon = require( '@automattic/dops-components/client/components/gridicon' );
import omit from 'lodash/omit';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import { removeInvalidInputProps } from 'lib/form';
import styles from './styles.scss';

class Input extends React.Component {
	constructor( props ) {
		super( props );

		this.onClickGridicon = () => {
			props.field.onChange( '' );

			this.element.focus();

			if ( props.untouch ) {
				props.untouch( props.field.name );
			}
		};

		this.saveRef = ( element ) => {
			this.element = element;
		};
	}

	render() {
		const { field } = this.props,
			gridIconSize = this.props.gridIconSize ? this.props.gridIconSize : 16,
			className = classNames( this.props.className, styles.inputContainer ),
			isInvalid = field.touched && field.error,
			inputClassName = classNames( this.props.inputClassName, styles.input, {
				[ styles.hasError ]: isInvalid
			} ),
			newProps = omit( this.props, [ 'className', 'field', 'untouch', 'gridIconSize', 'inputClassName' ] );

		return (
			<div className={ className }>
				<input
					className={ inputClassName }
					{ ...removeInvalidInputProps( field ) }
					{ ...newProps }
					ref={ this.saveRef }
				/>
				{ isInvalid && (
					<Gridicon
						className={ styles.gridicon }
						onClick={ this.onClickGridicon }
						icon="cross"
						size={ gridIconSize }
					/>
				) }
			</div>
		);
	}
}

Input.propTypes = {
	className: PropTypes.string,
	field: PropTypes.object.isRequired,
	gridIconSize: PropTypes.number,
	inputClassName: PropTypes.string,
	untouch: PropTypes.func
};

export default withStyles( styles )( Input );
