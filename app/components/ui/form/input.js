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

		this.saveRef = ( element ) => this.element = element;

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

	// When we set the value of react rendered input from elsewhere, it resets the caret position
	// to mitigate that issue the following code is used, more info can be found here:
	// https://github.com/facebook/react/issues/955
	// http://jsbin.com/dunutajuqo/edit?js,output
	componentDidUpdate() {
		// bail out if we don't manage the caret
		if ( ! this.props.manageCaret ) {
			return;
		}

		// bail out if we don't have input's ref
		if ( ! this.element ) {
			return;
		}

		const oldValue = this.element.value || '';
		const oldLength = oldValue.length;
		const oldIdx = this.element.selectionStart;
		const newValue = ( this.props.field.dirty || this.props.field.touched ? this.props.field.value : this.props.field.initialValue ) || '';
		const newValueLength = newValue.length;

		this.element.value = newValue;
		const newIdx = Math.max( 0, newValueLength - oldLength + oldIdx );
		this.element.selectionStart = this.element.selectionEnd = newIdx;
	}

	render() {
		const { field } = this.props,
			gridIconSize = this.props.gridIconSize ? this.props.gridIconSize : 16,
			className = classNames( this.props.className, styles.inputContainer, this.props.prefix ? styles.withPrefix : null ),
			isInvalid = field.touched && field.error,
			inputClassName = classNames( this.props.inputClassName, styles.input, {
				[ styles.hasError ]: isInvalid,
				[ styles.errorLtr ]: this.props.dir === 'ltr'
			} ),
			newProps = omit( this.props, [ 'className', 'field', 'untouch', 'gridIconSize', 'inputClassName', 'manageCaret' ] );

		let propsFromField = removeInvalidInputProps( field );

		// if we manage the caret position, don't pass the value to the input
		// we'll set it in componentDidUpdate after we calculate caret's new position
		if ( this.props.manageCaret ) {
			delete propsFromField.value;
		}

		return (
			<div className={ className }>
				{ this.props.prefix && (
					<span className={ styles.inputPrefix }>
						{ this.props.prefix }
					</span>
				) }
				<input
					id={ field.name }
					className={ inputClassName }
					{ ...propsFromField }
					{ ...newProps }
					dir={ this.props.dir }
					ref={ this.saveRef }
				/>
				{ isInvalid && (
					<Gridicon
						className={ classNames( styles.gridicon, { [ styles.gridiconLtr ]: this.props.dir === 'ltr' } ) }
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
	dir: PropTypes.string,
	field: PropTypes.object.isRequired,
	gridIconSize: PropTypes.number,
	inputClassName: PropTypes.string,
	manageCaret: PropTypes.bool,
	prefix: PropTypes.string,
	untouch: PropTypes.func
};

export default withErrorFocusable( withStyles( styles )( Input ) );
