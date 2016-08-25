// External dependencies
import classNames from 'classnames';
const Gridicon = require( '@automattic/dops-components/client/components/gridicon' );
import omit from 'lodash/omit';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import { removeInvalidInputProps } from 'lib/form';
import styles from './styles.scss';
import { withErrorFocusable } from 'components/ui/form/error-focuser';

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
			if ( element !== null ) {
				this.element = element;
			}
		};

		// Before React completes the client side render and makes the switch, we'll capture
		// the server side rendered element and get it's value
		if ( process.env.BROWSER ) {
			const serverSideElement = document.getElementById( this.props.field.name );
			this.serverSideValue = serverSideElement ? serverSideElement.value : null;
		}
	}

	componentDidMount() {
		if ( this.serverSideValue && ! this.props.field.value ) {
			this.props.field.onChange( this.serverSideValue );
		}
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
					id={ field.name }
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

export default withErrorFocusable( withStyles( styles )( Input ) );
