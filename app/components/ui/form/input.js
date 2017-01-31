// External dependencies
import classNames from 'classnames';
const Gridicon = require( '@automattic/dops-components/client/components/gridicon' );
import omit from 'lodash/omit';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import { isMobile } from 'lib/viewport';
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
			className = classNames( this.props.className, styles.inputContainer, this.props.prefix ? styles.withPrefix : null ),
			isInvalid = field.touched && field.error,
			inputClassName = classNames( this.props.inputClassName, styles.input, {
				[ styles.hasError ]: isInvalid,
				[ styles.errorLtr ]: this.props.dir === 'ltr'
			} ),
			newProps = omit( this.props, [
				'autoFocus',
				'className',
				'field',
				'untouch',
				'gridIconSize',
				'inputClassName'
			] );

		return (
			<div className={ className }>
				{ this.props.prefix && (
					<span className={ styles.inputPrefix }>
						{ this.props.prefix }
					</span>
				) }
				<input
					autoFocus={ ! isMobile() && this.props.autoFocus }
					id={ field.name }
					className={ inputClassName }
					{ ...removeInvalidInputProps( field ) }
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
	autoFocus: PropTypes.bool,
	className: PropTypes.string,
	dir: PropTypes.string,
	field: PropTypes.object.isRequired,
	gridIconSize: PropTypes.number,
	inputClassName: PropTypes.string,
	prefix: PropTypes.string,
	untouch: PropTypes.func
};

export default withErrorFocusable( withStyles( styles )( Input ) );
